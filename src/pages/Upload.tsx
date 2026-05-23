import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext.js";
import { Footer } from "../components/layout/Footer.js";
import { api } from "../services/research.service.js";
import toast from "react-hot-toast";
import { TopNavViewAll } from "../components/layout/TopNavViewAll.js";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import ReCAPTCHA from "react-google-recaptcha";

export const Upload = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    pdfLink: "",
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<ReCAPTCHA | null>(null);

  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (!captchaToken) {
        throw new Error("Please verify the reCAPTCHA before uploading");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("summary", formData.summary);
      formDataToSend.append("captcha_token", captchaToken);

      if (pdfFile) {
        formDataToSend.append("pdf", pdfFile);
      } else if (formData.pdfLink) {
        formDataToSend.append("pdf_link", formData.pdfLink);
      } else {
        throw new Error("Please provide either a PDF file or link");
      }

      await api.post(`/api/researches`, formDataToSend, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Research uploaded successfully!");

      setSuccess(true);
      setFormData({ title: "", summary: "", pdfLink: "" });
      setPdfFile(null);
      setCaptchaToken(null);
      captchaRef.current?.reset();
    } catch (err: any) {
      toast.error(err.response?.data?.error || err.message);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0710] text-mist">
      <TopNavViewAll />
      <main className="pt-24 pb-20 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="hidden md:block items-center gap-3 mb-6">
            <IoIosArrowBack className="text-mist/60 hover:text-mist cursor-pointer  transition-colors" />
          </Link>
          <h1 className="text-4xl font-bold text-white mb-3">
            Upload Research
          </h1>
          <p className="text-mist/60 mb-10">Share your research</p>

          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 text-green-400">
              Research uploaded successfully!
            </div>
          )}

          {error && (
            <div className="mb-6 p-4  bg-red-500/10 border border-red-500/30 text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="w-full px-4 py-3  bg-white/5 border border-white/10 text-white focus:border-emerald-500/50 focus:outline-none"
                placeholder="ex. The Impact of AI on Modern Research"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Author
              </label>
              <input
                type="text"
                value={user?.name || user?.email || ""}
                disabled
                className="w-full px-4 py-3  bg-white/5 border border-white/10 text-mist/60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Summary * (Max 100 words)
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) => {
                  const words = e.target.value.trim().split(/\s+/);
                  if (words.length <= 100 || e.target.value === "") {
                    setFormData({ ...formData, summary: e.target.value });
                  }
                }}
                required
                rows={5}
                className="w-full px-4 py-3  bg-white/5 border border-white/10 text-white focus:border-emerald-500/50 focus:outline-none resize-none"
                placeholder="Describe your research (max 100 words)"
              />
              <p className="mt-1 text-xs text-mist/50">
                {
                  formData.summary
                    .trim()
                    .split(/\s+/)
                    .filter((w) => w).length
                }{" "}
                / 100 words
              </p>
            </div>

            <div className="">
              <label className="block text-sm font-medium text-white mb-2">
                PDF File
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-3  bg-white/5 border border-white/50 border-dashed text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-emerald-500/20 file:text-emerald-400 hover:file:bg-emerald-500/30"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-xs text-mist/40 uppercase tracking-wider">
                OR
              </span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Verify you are human *
              </label>
              {recaptchaSiteKey ? (
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={recaptchaSiteKey}
                  onChange={(token: string | null) => {
                    setCaptchaToken(token);
                  }}
                  onExpired={() => setCaptchaToken(null)}
                />
              ) : (
                <p className="text-xs text-red-400">
                  Missing reCAPTCHA site key. Set VITE_RECAPTCHA_SITE_KEY in
                  client .env.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                PDF Link
              </label>
              <input
                type="url"
                value={formData.pdfLink}
                onChange={(e) =>
                  setFormData({ ...formData, pdfLink: e.target.value })
                }
                className="w-full px-4 py-3  bg-white/5 border border-white/10 text-white focus:border-emerald-500/50 focus:outline-none"
                placeholder="https://example.com/research.pdf"
              />
            </div>
            <div className="w-full flex items-start justify-start gap-2">
              <Link
                to={"/"}
                className="w-fit px-3 py-3 bg-transparent border border-white/20 text-white font-medium hover:bg-transparent hover:text-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                back
              </Link>
              <button
                type="submit"
                disabled={loading || !captchaToken || !recaptchaSiteKey}
                className="w-fit px-5 py-3 bg-emerald-600 text-white font-medium hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Uploading..." : "Upload Research"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
