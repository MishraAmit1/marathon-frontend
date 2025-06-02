import React from "react";
import { Link } from "react-router-dom";

const TermsAndCondition = () => {
  return (
    <>
      {/* Header Section */}
      <div
        className="w-full relative bg-cover bg-center h-80"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?q=80&w=1000&auto=format&fit=crop')",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="container mx-auto text-center py-20 relative z-10">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl tracking-wide font-sans">
            Terms & Conditions
          </h1>
          <div className="text-white text-lg font-medium drop-shadow-lg tracking-wide flex items-center justify-center">
            <Link
              to="/user/dashboard"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              HOME
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-yellow-400">Terms & Conditions</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-4 lg:px-8 xl:px-20">
          {/* Age Limits */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
              Age Limits
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-serif max-w-7xl mx-auto">
              These must be adhered to strictly, and the event organizer
              reserves the right to verify the age of participants before,
              during, and after the race.
            </p>
          </section>

          {/* Acceptance Of Entries */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
              Acceptance of Entries
            </h2>
            <ul className="list-decimal pl-6 space-y-4 text-gray-700 font-serif leading-relaxed max-w-7xl mx-auto">
              <li>
                Please do not submit more than one entry per person. Multiple
                applications will be rejected. However, participants of the
                Khardung La Challenge and Silk Route Ultra can also register for
                any of the other four races of the VAPI Marathon held two days
                later on Sunday, 14 September 2025.
              </li>
              <li>
                Before submitting your application, ensure you provide true,
                accurate, current, and complete information as requested.
                Applications with knowingly false information will not be
                accepted.
              </li>
              <li>
                By submitting a registration, all participants agree to the
                “Terms & Conditions” and “Acknowledgement of Risks & Indemnity
                Agreement” of the VAPI Marathon. For participants under 18, a
                guardian must confirm their relationship and accept these terms.
              </li>
              <li>
                Participants in the 11.2km Run, Half Marathon, Marathon,
                Khardung La Challenge, and Silk Route Ultra must provide details
                of previous marathons and finisher certificates per the
                Eligibility Criteria during registration.
              </li>
              <li>
                All participants must sign the Risk & Indemnity Agreement. For
                those under 18, a guardian must also sign the waiver and specify
                their relationship with the participant.
              </li>
              <li>
                Participants must refrain from displaying political, religious,
                or racial propaganda on apparel or gear during the race.
                Violation of this rule will result in disqualification.
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  Registration Fee:
                </span>{" "}
                Please review this section carefully before registering.
              </li>
            </ul>
          </section>

          {/* Entries Not Accepted */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
              Entries Not Accepted
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 font-serif max-w-7xl mx-auto">
              Participation is subject to entry confirmation. Entries will not
              be accepted if:
            </p>
            <ul className="list-decimal pl-6 space-y-4 text-gray-700 font-serif leading-relaxed max-w-7xl mx-auto">
              <li>
                Finisher certificates submitted as proof of eligibility are
                found incorrect.
              </li>
              <li>
                Incorrect documentation or information is provided during entry.
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4 font-serif max-w-7xl mx-auto">
              In such cases, the entry/registration will be canceled, and the
              paid registration fee will be non-refundable. The last date to
              register for the 12th edition of the VAPI Marathon is Monday, 21st
              April 2025.
            </p>
          </section>

          {/* Arrival In Leh And Acclimatisation */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
              Arrival in Leh and Acclimatisation
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-serif max-w-7xl mx-auto">
              By submitting an application, participants acknowledge and agree
              to arrive in Leh town as per VAPI Marathon guidelines.
              Acclimatisation is imperative and crucial for all participants.
            </p>
          </section>

          {/* Cancellation, Change of Race Category and Deferment of Registration */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
              Cancellation, Change of Race Category, and Deferment of
              Registration
            </h2>
            <ul className="list-decimal pl-6 space-y-4 text-gray-700 font-serif leading-relaxed max-w-7xl mx-auto">
              <li>
                Cancellation is permitted until May 31, 2025, via written
                notification from your registered email to
                info@vapimarathon.com. A processing fee of Rs 700/- will be
                deducted, with the balance refunded to your account.
              </li>
              <li>
                Refund requests beyond May 31, 2025, will not be entertained,
                except for serving defense personnel.
              </li>
              <li>
                If your entry is rejected for any reason, the registration fee
                will be refunded after deducting a Rs 700/- processing charge.
              </li>
              <li>
                Fees are non-refundable for non-participation, including failure
                to collect a bib or being deemed unfit to run on race day.
              </li>
              <li>
                Report any refund discrepancies to the VAPI Marathon team
                immediately; claims will not be accepted after June 30, 2025.
              </li>
              <li>
                Race category changes are allowed only until May 31, 2025, via
                written notification to info@vapimarathon.com. A processing fee
                of Rs 1,000 (Indian Nationals) or US$20 (Foreign Nationals)
                applies.
              </li>
              <li>
                Deferment to the next year is permitted until May 31, 2025, via
                written notification to info@vapimarathon.com. No transfers will
                be accepted after this date.
              </li>
            </ul>
          </section>

          {/* Bib Number and Collection */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
              Bib Number and Collection
            </h2>
            <ul className="list-disc pl-6 space-y-4 text-gray-700 font-serif leading-relaxed max-w-7xl mx-auto">
              <li>
                It is mandatory to collect your running BIB in person. Plan your
                travel according to BIB collection dates.
              </li>
              <li>BIBs are non-transferable to other participants.</li>
              <li>
                Ensure your official BIB number is visible throughout the race.
              </li>
              <li>Do not alter your BIB number in any way.</li>
              <li>No one else may wear your BIB number.</li>
              <li>
                Wearing another participant’s BIB results in disqualification
                and a ban from future VAPI Marathons.
              </li>
              <li>
                Pin your BIB securely to the front of your t-shirt and keep it
                visible at all times.
              </li>
              <li>
                Folding or covering any part of your BIB may lead to
                disqualification.
              </li>
              <li>Avoid bending, creasing, or folding your BIB forcefully.</li>
              <li>
                Fill out all required information on the back of your BIB.
              </li>
              <li>
                Ultra race participants (Silk Route Ultra and Khardungla
                Challenge) receive two BIBs (front and back). Ensure both are
                properly pinned and visible, or face disqualification.
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4 font-serif max-w-7xl mx-auto">
              <span className="font-semibold">BIB Collection Dates:</span> All
              confirmed participants must collect BIBs and timing chips in
              person. Plan your travel accordingly:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 font-serif leading-relaxed max-w-7xl mx-auto">
              <li>
                Silk Route Ultra and Khardungla Challenge: Tuesday 2nd &
                Wednesday 3rd September 2025.
              </li>
              <li>
                Marathon and Half Marathon: Sunday 7th & Monday 8th September
                2025.
              </li>
              <li>
                11.2km Run and 05km Run for Fun: Monday 8th September 2025.
              </li>
            </ul>
          </section>

          {/* Timing Chips */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
              Timing Chips
            </h2>
            <ul className="list-disc pl-6 space-y-4 text-gray-700 font-serif leading-relaxed max-w-7xl mx-auto">
              <li>
                VAPI Marathon uses timing chips for timed races: 11.2km Run,
                Half Marathon, Marathon, 72km Khardung La Challenge, and 122km
                Silk Route Ultra.
              </li>
              <li>
                Attach the timing chip to your BIB as per provided instructions
                to record your race time.
              </li>
              <li>Wear the chip on race day, securely attached to your BIB.</li>
              <li>
                The chip must remain attached from Start to Finish to be
                recognized as a finisher with an official time.
              </li>
              <li>
                The chip is linked to your BIB number and must not be used by
                another participant.
              </li>
            </ul>
          </section>

          {/* Code Of Conduct */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
              Code of Conduct
            </h2>
            <ol className="list-decimal pl-6 space-y-4 text-gray-700 font-serif leading-relaxed max-w-7xl mx-auto">
              <li>
                Follow all instructions from organizers, race officials, course
                marshals, and volunteers at all times.
              </li>
              <li>
                Maintain a sportsmanlike attitude and respect race officials,
                fellow runners, and Leh locals.
              </li>
              <li>
                The organizer may disqualify participants who refuse to follow
                official instructions.
              </li>
              <li>
                Avoid displaying political, religious, or racial propaganda on
                apparel or gear. Violation leads to disqualification.
              </li>
            </ol>
          </section>

          {/* Official Time and Net Time */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
              Official Time and Net Time
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-serif max-w-7xl mx-auto">
              Official and Net Times (with Start and Finish times) will be
              provided for participants completing races within the cut-off
              time. Your Net Time will be your official time.
            </p>
          </section>

          {/* Participants Must Be Medically and Physically Fit */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
              Participants Must Ensure Medical and Physical Fitness
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-serif max-w-7xl mx-auto">
              Individuals with chronic conditions (e.g., heart disease or high
              blood pressure) should not participate. The organizer reserves the
              right to disallow or disqualify unfit participants.
            </p>
          </section>

          {/* Race Day Images */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
              Race Day Images
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-serif max-w-7xl mx-auto">
              Race day images will be reviewed post-race. Participants not
              wearing their assigned BIB will be disqualified from the current
              and future editions. Participants grant VAPI Marathon and its
              organizers exclusive rights to use their name, images, and videos
              for promotional purposes across all platforms.
            </p>
          </section>

          {/* Event Cancellation */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
              Event Cancellation
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-serif max-w-7xl mx-auto">
              If canceled due to unforeseen circumstances or force majeure,
              registrations will carry forward to the next year in the same
              category. No refunds will be issued except for serving Indian
              Defence Personnel.
            </p>
          </section>

          {/* Changes to the Event */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
              Changes to the Event
            </h2>
            <ol className="list-decimal pl-6 space-y-4 text-gray-700 font-serif leading-relaxed max-w-7xl mx-auto">
              <li>
                The organizer may modify the course or race procedures as
                needed. Changes will be communicated to participants.
              </li>
              <li>
                If the course distance is reduced, the event is still considered
                staged, and no refunds will be provided.
              </li>
            </ol>
          </section>

          {/* Application Form */}
          <section className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
              Application Form
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-serif max-w-7xl mx-auto">
              Participation rights and benefits are at the sole discretion of
              the High Altitude Sports Foundation (VAPI Marathon) and cannot be
              transferred. Only the confirmed participant is entitled to these
              benefits.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default TermsAndCondition;
