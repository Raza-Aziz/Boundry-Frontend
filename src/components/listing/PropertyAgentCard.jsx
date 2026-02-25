import React from "react";
import { ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function PropertyAgentCard({ listing }) {
  const handleWhatsappContact = () => {
    // Use the phone number from your seller data (or a hardcoded one for testing)
    const phoneNumber = listing.createdBy.phone; // Replace with listing.sellerPhone or similar

    // Create a custom message
    const message = `Assalam o Alaikum, I am interested in your property: "${listing.title}" in ${listing.location.area}, ${listing.location.city}. Can I get more details?
      Link: ${window.location.href}`;

    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);

    // Construct the final URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open in a new tab
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailContact = () => {
    const sellerEmail = listing.createdBy.email; // Replace with listing.sellerEmail
    const subject = encodeURIComponent(`Inquiry: ${listing.title}`);

    const body = encodeURIComponent(
      `Hi, I found your listing "${listing.title}" on Boundry.\n\n` +
        `I would like to get more information regarding this property located in ${listing.location.area}.\n\n` +
        `Property Link: ${window.location.href}`,
    );

    // Construct the mailto link
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${sellerEmail}&su=${subject}&body=${body}`;

    // Use window.location.href for mailto instead of window.open to avoid blank tabs
    // window.location.href = mailtoUrl;
    window.open(gmailUrl, "_blank");
  };

  return (
    <div className="lg:col-span-4 relative">
      <div className="sticky top-24">
        <div className="bg-white dark:bg-[#2a2422] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none dark:border dark:border-stone-800 p-6 border border-stone-100">
          {/* Agent Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img
                alt="Real Estate Agent Headshot"
                className="w-16 h-16 rounded-full object-cover border-2 border-stone-100 dark:border-stone-700"
                src={listing.createdBy.avatar.url}
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#2a2422] rounded-full"></div>
            </div>
            <div>
              <h3 className="font-serif text-lg capitalize font-medium text-stone-900 dark:text-white">
                {listing.createdBy.username}
              </h3>
              {/* <p className="text-xs text-boundry-primary font-medium tracking-wide uppercase">
                Premier Agent
              </p>*/}
              {/* <div className="flex items-center gap-1 mt-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm text-stone-600 dark:text-stone-400 font-medium">
                  4.9 (124 reviews)
                </span>
              </div>*/}
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            {/* Actions */}
            <button
              className="w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium cursor-pointer py-3 px-2 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors shadow-sm text-sm tracking-wide group flex items-center justify-center gap-2"
              type="button"
              onClick={handleEmailContact}
            >
              <Mail className="-ml-9" />
              <span>Contact via Email</span>
            </button>
            <button
              className="w-full bg-boundry-primary text-white font-medium py-3 px-4 cursor-pointer rounded-lg hover:bg-boundry-primary-dark transition-colors shadow-sm flex items-center justify-center gap-2 text-sm tracking-wide group"
              type="button"
              onClick={handleWhatsappContact}
            >
              {/* <Phone className="w-5 h-5" />*/}
              <FaWhatsapp className="w-6 h-6" />
              <span>Contact via WhatsApp</span>
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-xs text-stone-400">
              By submitting this form you agree to our Terms of Use.
            </p>
          </div>
        </div>

        {/* Similar Homes Link */}
        <div className="mt-6 text-center">
          <Link
            to={`/search?city=${listing.location.city}`}
            className="text-sm text-stone-500 hover:text-boundry-primary transition-colors capitalize inline-flex items-center gap-1 border-b border-transparent hover:border-boundry-primary pb-0.5"
          >
            See similar properties in {listing.location.city}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyAgentCard;
