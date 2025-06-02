import React from "react";
import { HiArrowRight } from "react-icons/hi";

const AboutMarathon = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Marathon
          </h2>
          <p className="mt-3 text-gray-500">
            Health is a significant concern for students and professionals due
            to today's fast-paced lifestyle. The lack of physical activity often
            leads to obesity and related health issues. Engaging in running can
            greatly enhance your health in numerous ways. It boosts your immune
            system, aids in weight management, reduces stress, combats
            depression, and improves self-confidence.
          </p>
          <p className="mt-3 text-gray-500">
            <strong>Annual Community Half Marathon</strong> is a major event in
            our community, attracting over 3000 participants and volunteers.
            This event is backed by various sectors including businesses,
            government bodies, and non-profit organizations. It is typically
            inaugurated and supported by prominent business leaders,
            high-ranking officials, and respected community members.
          </p>
          <p className="mt-3 text-gray-500">
            To encourage physical activity among all age groups and to support
            the important cause of <strong>"Education for All"</strong>, our
            organization is hosting the{" "}
            <strong>"Annual Community Half Marathon"</strong> for the ninth
            consecutive year.
          </p>
        </div>

        <div className="mt-10">
          <div className="max-w-2xl mx-auto sm:text-center lg:max-w-none lg:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  The race distances are:
                </h3>
                <ul className="mt-4 text-gray-600 space-y-2">
                  <li class="flex items-center">
                    <HiArrowRight className="w-6 h-6 text-blue-500 ml-2" />
                    <span className="ml-3">1Km</span>
                  </li>
                  <li class="flex items-center">
                    <HiArrowRight className="w-6 h-6 text-blue-500 ml-2" />
                    <span className="ml-3">2km</span>
                  </li>
                  <li class="flex items-center">
                    <HiArrowRight className="w-6 h-6 text-blue-500 ml-2" />
                    <span className="ml-3">3km</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  You can register online at:
                </h3>
                <ul className="mt-4 text-gray-600 space-y-2">
                  <li>
                    <a
                      href="http://www.marathon.com"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      www.marathon.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+9198257310004"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Contact us at +91-12345 67890
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-5 border border-transparent rounded-md"
          >
            Join us in this exciting event and help us make the world a better
            place for girls!
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutMarathon;
