"use client";

import React, { useState, useId } from "react";
import { getPageData, getLayoutData } from "@/data/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import { postContactForm } from "@/api/Api";
import { ContactFormData } from "@/types/types";

const Contact = () => {
  const { language: lang } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const data = getPageData("contact", lang);
  const layoutData = getLayoutData("footer", lang);

  // Then update your handleSubmit function:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsSubmitting(true);

      // Replace the mock promise with actual API call
      await postContactForm(formData);

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after successful submission
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
      setIsSubmitted(false);

      // Optional: Show error message to user
      alert(
        lang === "en"
          ? "Failed to send message. Please try again."
          : "መልእክት ለመላክ አልተሳካም። እባክዎ እንደገና ይሞክሩ።"
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto px-4">
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: Phone,
              title: data.info.phone.title,
              value: data.info.phone.value,
              link: `tel:${data.info.phone.value}`,
              color: "bg-blue-50 dark:bg-blue-900/20",
              iconColor: "text-blue-600",
            },
            {
              icon: Mail,
              title: data.info.email.title,
              value: data.info.email.value,
              link: `mailto:${data.info.email.value}`,
              color: "bg-green-50 dark:bg-green-900/20",
              iconColor: "text-green-600",
            },
            {
              icon: MapPin,
              title: data.info.address.title,
              value: data.info.address.value,
              color: "bg-orange-50 dark:bg-orange-900/20",
              iconColor: "text-orange-600",
            },
            {
              icon: Clock,
              title: data.info.hours.title,
              value: data.info.hours.value,
              color: "bg-purple-50 dark:bg-purple-900/20",
              iconColor: "text-purple-600",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.color} rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${item.iconColor
                    .replace("text-", "bg-")
                    .replace("600", "100")} dark:bg-opacity-20`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-primary" />
              {lang === "en" ? "Send Message" : "መልእክት ይላኩ"}
            </h2>

            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {lang === "en" ? "Message Sent!" : "መልእክት ተልኳል!"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {lang === "en"
                    ? "We'll get back to you soon."
                    : "በቅርብ ጊዜ እንመለስልዎታለን።"}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {data.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder={lang === "en" ? "Your name" : "ስምዎ"}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {data.form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {data.form.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder={
                      lang === "en" ? "Phone (optional)" : "ስልክ (አማራጭ)"
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {data.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder={
                      lang === "en" ? "Your message..." : "መልእክትዎ..."
                    }
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {lang === "en" ? "Sending..." : "በመላክ ላይ..."}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {data.form.submit}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Map & Additional Info */}
          <div className="space-y-8">
            {/* Map */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {lang === "en" ? "Our Location" : "አካባቢን"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {data.info.address.value}
                </p>
              </div>
              <div className="h-64 w-full relative">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    data.info.address.value
                  )}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {lang === "en" ? "Quick Contact" : "ፈጣን እውቂያ"}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {lang === "en" ? "Call us directly" : "በቀጥታ ይደውሉ"}
                    </p>
                    <a
                      href={`tel:${data.info.phone.value}`}
                      className="font-medium text-gray-900 dark:text-white hover:text-primary transition-colors"
                    >
                      {data.info.phone.value}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {lang === "en" ? "Email us" : "ኢሜይል ይላኩ"}
                    </p>
                    <a
                      href={`mailto:${data.info.email.value}`}
                      className="font-medium text-gray-900 dark:text-white hover:text-primary transition-colors"
                    >
                      {data.info.email.value}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
