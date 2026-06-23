import svgPaths from "./svg-evnk7nuerj";
import imgLogo from "./cc2e61b111cffc63dc0e0ab4b569556ebceef676.png";

function Designs() {
  return (
    <div className="absolute h-[411px] left-[-0.01px] top-[44px] w-[2253.017px]" data-name="Designs">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[555.51px] not-italic text-[#5d5b5b] text-[32px] text-center top-[365px] w-[935px]">Book tickets for upcoming municipal events and activities</p>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:ExtraBold',sans-serif] h-[72px] leading-[normal] left-[206.51px] not-italic text-[#78aad7] text-[64px] text-center top-[248px] w-[237px]">Events</p>
      <div className="absolute h-0 left-0 top-[173.69px] w-[2314.017px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2314.02 1">
            <line id="Line 2" stroke="var(--stroke-0, #5D5B5B)" x2="2314.02" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[141px] left-[46.01px] top-0 w-[191px]" data-name="LOGO">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[196.53%] left-[-22.99%] max-w-none top-[-48.51%] w-[144.89%]" src={imgLogo} />
        </div>
      </div>
    </div>
  );
}

function ButtonBuy() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[47px] items-center justify-center left-[296px] px-[15px] py-[5px] rounded-[10px] top-[393px] w-[137px]" data-name="Button BUY">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">Buy</p>
    </div>
  );
}

function LucideTicket() {
  return (
    <div className="absolute h-[26px] left-0 top-[5px] w-[28px]" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 26">
        <g id="lucide/ticket">
          <path d={svgPaths.p32977f00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NoTickets() {
  return (
    <div className="absolute h-[46px] left-[-19px] top-[297px] w-[302px]" data-name="NO. TICKETS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[39px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[307px]">5,000 tickets available</p>
      <LucideTicket />
    </div>
  );
}

function LucideMapPin() {
  return (
    <div className="absolute h-[29px] left-0 top-[3px] w-[32px]" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 29">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.pd86ce00} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pef2b900} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Address() {
  return (
    <div className="absolute h-[46px] left-[-21px] top-[244px] w-[225px]" data-name="ADDRESS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[41px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[302px]">Hungriyan Park</p>
      <LucideMapPin />
    </div>
  );
}

function LucideCalendarFold() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[34px]" data-name="lucide/calendar-fold">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 30">
        <g id="lucide/calendar-fold">
          <path d={svgPaths.p36f71c80} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Date() {
  return (
    <div className="absolute h-[46px] left-[-22px] top-[190px] w-[226px]" data-name="DATE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[42px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[244px]">February 16, 2027</p>
      <LucideCalendarFold />
    </div>
  );
}

function Category() {
  return (
    <div className="absolute h-[25px] left-[296px] top-[7px] w-[137px]" data-name="Category">
      <div className="absolute bg-[#7391ac] h-[28px] left-0 rounded-[10px] top-0 w-[137px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[23px] leading-[normal] left-[68.5px] not-italic text-[16px] text-center text-white top-[2px] w-[115px]">Government</p>
    </div>
  );
}

function Box10StreetClean() {
  return (
    <div className="absolute h-[440px] left-[693px] top-[2453px] w-[433px]" data-name="Box 10 STREET CLEAN">
      <div className="absolute bg-[rgba(217,217,217,0)] border border-black border-solid h-[497px] left-[-60px] rounded-[30px] top-[-20px] w-[518px]" />
      <ButtonBuy />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[29px] leading-[normal] left-[-16px] not-italic text-[#5d5b5b] text-[24px] top-[402px] w-[94px]">$ 0</p>
      <NoTickets />
      <Address />
      <Date />
      <Category />
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[72px] leading-[normal] left-[-18px] not-italic text-[#78aad7] text-[48px] top-[20px] w-[360px]">Green City</p>
    </div>
  );
}

function ButtonBuy1() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[47px] items-center justify-center left-[293px] px-[15px] py-[5px] rounded-[10px] top-[393px] w-[137px]" data-name="Button BUY">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">Buy</p>
    </div>
  );
}

function LucideTicket1() {
  return (
    <div className="absolute h-[26px] left-0 top-[5px] w-[28px]" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 26">
        <g id="lucide/ticket">
          <path d={svgPaths.p32977f00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NoTickets1() {
  return (
    <div className="absolute h-[46px] left-[-15px] top-[297px] w-[302px]" data-name="NO. TICKETS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[39px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[263px]">1,000 tickets available</p>
      <LucideTicket1 />
    </div>
  );
}

function LucideMapPin1() {
  return (
    <div className="absolute h-[29px] left-0 top-[3px] w-[32px]" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 29">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.pd86ce00} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pef2b900} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Address1() {
  return (
    <div className="absolute h-[46px] left-[-17px] top-[244px] w-[225px]" data-name="ADDRESS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[41px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[295px]">Sumalangit Hospital</p>
      <LucideMapPin1 />
    </div>
  );
}

function LucideCalendarFold1() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[34px]" data-name="lucide/calendar-fold">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 30">
        <g id="lucide/calendar-fold">
          <path d={svgPaths.p36f71c80} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Date1() {
  return (
    <div className="absolute h-[46px] left-[-18px] top-[190px] w-[226px]" data-name="DATE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[42px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[288px]">January 90, 2027</p>
      <LucideCalendarFold1 />
    </div>
  );
}

function Category1() {
  return (
    <div className="absolute h-[25px] left-[293px] top-[7px] w-[137px]" data-name="Category">
      <div className="absolute bg-[#7391ac] h-[28px] left-0 rounded-[10px] top-0 w-[137px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[23px] leading-[normal] left-[68.5px] not-italic text-[16px] text-center text-white top-[2px] w-[115px]">Government</p>
    </div>
  );
}

function Box9Checkup() {
  return (
    <div className="absolute h-[440px] left-[150px] top-[2453px] w-[430px]" data-name="Box 9 CHECKUP">
      <div className="absolute bg-[rgba(217,217,217,0)] border border-black border-solid h-[497px] left-[-65px] rounded-[30px] top-[-20px] w-[518px]" />
      <ButtonBuy1 />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[29px] leading-[normal] left-[-16px] not-italic text-[#5d5b5b] text-[24px] top-[402px] w-[94px]">$ 0</p>
      <NoTickets1 />
      <Address1 />
      <Date1 />
      <Category1 />
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[72px] leading-[normal] left-[-18px] not-italic text-[#78aad7] text-[48px] top-[20px] w-[322px]">Free Checkups</p>
    </div>
  );
}

function ButtonBuy2() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[47px] items-center justify-center left-[296px] px-[15px] py-[5px] rounded-[10px] top-[393px] w-[137px]" data-name="Button BUY">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">Buy</p>
    </div>
  );
}

function Category2() {
  return (
    <div className="absolute h-[25px] left-[296px] top-[7px] w-[137px]" data-name="Category">
      <div className="absolute bg-[#7391ac] h-[28px] left-0 rounded-[10px] top-0 w-[137px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[23px] leading-[normal] left-[68.5px] not-italic text-[16px] text-center text-white top-[2px] w-[115px]">Sports</p>
    </div>
  );
}

function LucideTicket2() {
  return (
    <div className="absolute h-[26px] left-0 top-[5px] w-[28px]" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 26">
        <g id="lucide/ticket">
          <path d={svgPaths.p32977f00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NoTickets2() {
  return (
    <div className="absolute h-[46px] left-[-19px] top-[297px] w-[302px]" data-name="NO. TICKETS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[39px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[263px]">1,000 tickets available</p>
      <LucideTicket2 />
    </div>
  );
}

function LucideMapPin2() {
  return (
    <div className="absolute h-[29px] left-0 top-[3px] w-[32px]" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 29">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.pd86ce00} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pef2b900} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Address2() {
  return (
    <div className="absolute h-[46px] left-[-21px] top-[244px] w-[225px]" data-name="ADDRESS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[41px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[356px]">One Two Park</p>
      <LucideMapPin2 />
    </div>
  );
}

function LucideCalendarFold2() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[34px]" data-name="lucide/calendar-fold">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 30">
        <g id="lucide/calendar-fold">
          <path d={svgPaths.p36f71c80} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Date2() {
  return (
    <div className="absolute h-[46px] left-[-22px] top-[190px] w-[226px]" data-name="DATE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[42px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[244px]">January 40, 2027</p>
      <LucideCalendarFold2 />
    </div>
  );
}

function Box12KidCompetition() {
  return (
    <div className="absolute h-[440px] left-[1785px] top-[1887px] w-[433px]" data-name="Box 12 KID COMPETITION">
      <div className="absolute bg-[rgba(217,217,217,0)] border border-black border-solid h-[497px] left-[-60px] rounded-[30px] top-[-20px] w-[518px]" />
      <ButtonBuy2 />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[29px] leading-[normal] left-[-16px] not-italic text-[#5d5b5b] text-[24px] top-[402px] w-[134px]">$ 50.00</p>
      <Category2 />
      <NoTickets2 />
      <Address2 />
      <Date2 />
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[72px] leading-[normal] left-[-18px] not-italic text-[#78aad7] text-[48px] top-[20px] w-[360px]">Pambatang Panglaro</p>
    </div>
  );
}

function ButtonBuy3() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[47px] items-center justify-center left-[296px] px-[15px] py-[5px] rounded-[10px] top-[393px] w-[137px]" data-name="Button BUY">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">Buy</p>
    </div>
  );
}

function Category3() {
  return (
    <div className="absolute h-[25px] left-[296px] top-[7px] w-[137px]" data-name="Category">
      <div className="absolute bg-[#7391ac] h-[28px] left-0 rounded-[10px] top-0 w-[137px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[23px] leading-[normal] left-[68.5px] not-italic text-[16px] text-center text-white top-[2px] w-[115px]">Entertainment</p>
    </div>
  );
}

function LucideTicket3() {
  return (
    <div className="absolute h-[26px] left-0 top-[5px] w-[28px]" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 26">
        <g id="lucide/ticket">
          <path d={svgPaths.p32977f00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NoTickets3() {
  return (
    <div className="absolute h-[46px] left-[-19px] top-[297px] w-[302px]" data-name="NO. TICKETS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[39px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[263px]">1,000 tickets available</p>
      <LucideTicket3 />
    </div>
  );
}

function LucideMapPin3() {
  return (
    <div className="absolute h-[29px] left-0 top-[3px] w-[32px]" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 29">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.pd86ce00} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pef2b900} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Address3() {
  return (
    <div className="absolute h-[46px] left-[-21px] top-[244px] w-[225px]" data-name="ADDRESS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[41px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[345px]">Tanghalan ng Tanghalian</p>
      <LucideMapPin3 />
    </div>
  );
}

function LucideCalendarFold3() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[34px]" data-name="lucide/calendar-fold">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 30">
        <g id="lucide/calendar-fold">
          <path d={svgPaths.p36f71c80} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Date3() {
  return (
    <div className="absolute h-[46px] left-[-22px] top-[190px] w-[226px]" data-name="DATE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[42px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[244px]">December 10, 2026</p>
      <LucideCalendarFold3 />
    </div>
  );
}

function Box11CulturePerformance() {
  return (
    <div className="absolute h-[440px] left-[1239px] top-[1887px] w-[433px]" data-name="Box 11 CULTURE PERFORMANCE">
      <div className="absolute bg-[rgba(217,217,217,0)] border border-black border-solid h-[497px] left-[-60px] rounded-[30px] top-[-20px] w-[518px]" />
      <ButtonBuy3 />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[29px] leading-[normal] left-[-16px] not-italic text-[#5d5b5b] text-[24px] top-[402px] w-[134px]">$ 100.00</p>
      <Category3 />
      <NoTickets3 />
      <Address3 />
      <Date3 />
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[72px] leading-[normal] left-[-18px] not-italic text-[#78aad7] text-[48px] top-[20px] w-[360px]">Kulturang Maganda</p>
    </div>
  );
}

function ButtonBuy4() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[47px] items-center justify-center left-[296px] px-[15px] py-[5px] rounded-[10px] top-[393px] w-[137px]" data-name="Button BUY">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">Buy</p>
    </div>
  );
}

function LucideTicket4() {
  return (
    <div className="absolute h-[26px] left-0 top-[5px] w-[28px]" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 26">
        <g id="lucide/ticket">
          <path d={svgPaths.p32977f00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NoTickets4() {
  return (
    <div className="absolute h-[46px] left-[-19px] top-[297px] w-[302px]" data-name="NO. TICKETS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[39px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[307px]">5,000 tickets available</p>
      <LucideTicket4 />
    </div>
  );
}

function LucideMapPin4() {
  return (
    <div className="absolute h-[29px] left-0 top-[3px] w-[32px]" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 29">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.pd86ce00} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pef2b900} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Address4() {
  return (
    <div className="absolute h-[46px] left-[-21px] top-[244px] w-[225px]" data-name="ADDRESS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[41px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[302px]">Shakira Mountain</p>
      <LucideMapPin4 />
    </div>
  );
}

function LucideCalendarFold4() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[34px]" data-name="lucide/calendar-fold">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 30">
        <g id="lucide/calendar-fold">
          <path d={svgPaths.p36f71c80} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Date4() {
  return (
    <div className="absolute h-[46px] left-[-22px] top-[190px] w-[226px]" data-name="DATE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[42px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[244px]">December 6, 2026</p>
      <LucideCalendarFold4 />
    </div>
  );
}

function Category4() {
  return (
    <div className="absolute h-[25px] left-[296px] top-[7px] w-[137px]" data-name="Category">
      <div className="absolute bg-[#7391ac] h-[28px] left-0 rounded-[10px] top-0 w-[137px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[23px] leading-[normal] left-[68.5px] not-italic text-[16px] text-center text-white top-[2px] w-[115px]">Government</p>
    </div>
  );
}

function Box10TreePlant() {
  return (
    <div className="absolute h-[440px] left-[693px] top-[1887px] w-[433px]" data-name="Box 10 TREE PLANT">
      <div className="absolute bg-[rgba(217,217,217,0)] border border-black border-solid h-[497px] left-[-60px] rounded-[30px] top-[-20px] w-[518px]" />
      <ButtonBuy4 />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[29px] leading-[normal] left-[-16px] not-italic text-[#5d5b5b] text-[24px] top-[402px] w-[94px]">$ 0</p>
      <NoTickets4 />
      <Address4 />
      <Date4 />
      <Category4 />
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[72px] leading-[normal] left-[-18px] not-italic text-[#78aad7] text-[48px] top-[20px] w-[360px]">Tree Planting</p>
    </div>
  );
}

function ButtonBuy5() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[47px] items-center justify-center left-[293px] px-[15px] py-[5px] rounded-[10px] top-[393px] w-[137px]" data-name="Button BUY">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">Buy</p>
    </div>
  );
}

function LucideTicket5() {
  return (
    <div className="absolute h-[26px] left-0 top-[5px] w-[28px]" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 26">
        <g id="lucide/ticket">
          <path d={svgPaths.p32977f00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NoTickets5() {
  return (
    <div className="absolute h-[46px] left-[-15px] top-[297px] w-[302px]" data-name="NO. TICKETS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[39px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[263px]">1,000 tickets available</p>
      <LucideTicket5 />
    </div>
  );
}

function LucideMapPin5() {
  return (
    <div className="absolute h-[29px] left-0 top-[3px] w-[32px]" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 29">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.pd86ce00} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pef2b900} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Address5() {
  return (
    <div className="absolute h-[46px] left-[-17px] top-[244px] w-[225px]" data-name="ADDRESS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[41px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[295px]">Banana Park</p>
      <LucideMapPin5 />
    </div>
  );
}

function LucideCalendarFold5() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[34px]" data-name="lucide/calendar-fold">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 30">
        <g id="lucide/calendar-fold">
          <path d={svgPaths.p36f71c80} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Date5() {
  return (
    <div className="absolute h-[46px] left-[-18px] top-[190px] w-[226px]" data-name="DATE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[42px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[242px]">November 90, 2026</p>
      <LucideCalendarFold5 />
    </div>
  );
}

function Category5() {
  return (
    <div className="absolute h-[25px] left-[293px] top-[7px] w-[137px]" data-name="Category">
      <div className="absolute bg-[#7391ac] h-[28px] left-0 rounded-[10px] top-0 w-[137px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[23px] leading-[normal] left-[68.5px] not-italic text-[16px] text-center text-white top-[2px] w-[115px]">Sports</p>
    </div>
  );
}

function Box9Funrun() {
  return (
    <div className="absolute h-[440px] left-[150px] top-[1887px] w-[430px]" data-name="Box 9 FUNRUN">
      <div className="absolute bg-[rgba(217,217,217,0)] border border-black border-solid h-[497px] left-[-65px] rounded-[30px] top-[-20px] w-[518px]" />
      <ButtonBuy5 />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[29px] leading-[normal] left-[-16px] not-italic text-[#5d5b5b] text-[24px] top-[402px] w-[94px]">$ 0</p>
      <NoTickets5 />
      <Address5 />
      <Date5 />
      <Category5 />
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[72px] leading-[normal] left-[-18px] not-italic text-[#78aad7] text-[48px] top-[20px] w-[384px]">Fun Run Marathon</p>
    </div>
  );
}

function ButtonBuy6() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[47px] items-center justify-center left-[296px] px-[15px] py-[5px] rounded-[10px] top-[393px] w-[137px]" data-name="Button BUY">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">Buy</p>
    </div>
  );
}

function Category6() {
  return (
    <div className="absolute h-[25px] left-[296px] top-[7px] w-[137px]" data-name="Category">
      <div className="absolute bg-[#7391ac] h-[28px] left-0 rounded-[10px] top-0 w-[137px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[23px] leading-[normal] left-[68.5px] not-italic text-[16px] text-center text-white top-[2px] w-[115px]">Entertainment</p>
    </div>
  );
}

function LucideTicket6() {
  return (
    <div className="absolute h-[26px] left-0 top-[5px] w-[28px]" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 26">
        <g id="lucide/ticket">
          <path d={svgPaths.p32977f00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NoTickets6() {
  return (
    <div className="absolute h-[46px] left-[-19px] top-[297px] w-[302px]" data-name="NO. TICKETS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[39px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[263px]">1,000 tickets available</p>
      <LucideTicket6 />
    </div>
  );
}

function LucideMapPin6() {
  return (
    <div className="absolute h-[29px] left-0 top-[3px] w-[32px]" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 29">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.pd86ce00} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pef2b900} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Address6() {
  return (
    <div className="absolute h-[46px] left-[-21px] top-[244px] w-[225px]" data-name="ADDRESS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[41px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[356px]">Tanghalan ng Tanghalian</p>
      <LucideMapPin6 />
    </div>
  );
}

function LucideCalendarFold6() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[34px]" data-name="lucide/calendar-fold">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 30">
        <g id="lucide/calendar-fold">
          <path d={svgPaths.p36f71c80} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Date6() {
  return (
    <div className="absolute h-[46px] left-[-22px] top-[190px] w-[226px]" data-name="DATE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[42px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[244px]">October 40, 2026</p>
      <LucideCalendarFold6 />
    </div>
  );
}

function Box8TalentShow() {
  return (
    <div className="absolute h-[440px] left-[1785px] top-[1321px] w-[433px]" data-name="Box 8 TALENT SHOW">
      <div className="absolute bg-[rgba(217,217,217,0)] border border-black border-solid h-[497px] left-[-60px] rounded-[30px] top-[-20px] w-[518px]" />
      <ButtonBuy6 />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[29px] leading-[normal] left-[-16px] not-italic text-[#5d5b5b] text-[24px] top-[402px] w-[134px]">$ 20.00</p>
      <Category6 />
      <NoTickets6 />
      <Address6 />
      <Date6 />
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[72px] leading-[normal] left-[-18px] not-italic text-[#78aad7] text-[48px] top-[20px] w-[360px]">Talent Show</p>
    </div>
  );
}

function ButtonBuy7() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[47px] items-center justify-center left-[296px] px-[15px] py-[5px] rounded-[10px] top-[393px] w-[137px]" data-name="Button BUY">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">Buy</p>
    </div>
  );
}

function Category7() {
  return (
    <div className="absolute h-[25px] left-[296px] top-[7px] w-[137px]" data-name="Category">
      <div className="absolute bg-[#7391ac] h-[28px] left-0 rounded-[10px] top-0 w-[137px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[23px] leading-[normal] left-[68.5px] not-italic text-[16px] text-center text-white top-[2px] w-[115px]">Educational</p>
    </div>
  );
}

function LucideTicket7() {
  return (
    <div className="absolute h-[26px] left-0 top-[5px] w-[28px]" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 26">
        <g id="lucide/ticket">
          <path d={svgPaths.p32977f00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NoTickets7() {
  return (
    <div className="absolute h-[46px] left-[-19px] top-[297px] w-[302px]" data-name="NO. TICKETS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[39px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[263px]">1,000 tickets available</p>
      <LucideTicket7 />
    </div>
  );
}

function LucideMapPin7() {
  return (
    <div className="absolute h-[29px] left-0 top-[3px] w-[32px]" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 29">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.pd86ce00} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pef2b900} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Address7() {
  return (
    <div className="absolute h-[46px] left-[-21px] top-[244px] w-[225px]" data-name="ADDRESS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[41px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[302px]">Doodle Mansion</p>
      <LucideMapPin7 />
    </div>
  );
}

function LucideCalendarFold7() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[34px]" data-name="lucide/calendar-fold">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 30">
        <g id="lucide/calendar-fold">
          <path d={svgPaths.p36f71c80} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Date7() {
  return (
    <div className="absolute h-[46px] left-[-22px] top-[190px] w-[226px]" data-name="DATE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[42px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[244px]">October 10, 2026</p>
      <LucideCalendarFold7 />
    </div>
  );
}

function Box7Workshop() {
  return (
    <div className="absolute h-[440px] left-[1239px] top-[1321px] w-[433px]" data-name="Box 7 WORKSHOP">
      <div className="absolute bg-[rgba(217,217,217,0)] border border-black border-solid h-[497px] left-[-60px] rounded-[30px] top-[-20px] w-[518px]" />
      <ButtonBuy7 />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[29px] leading-[normal] left-[-16px] not-italic text-[#5d5b5b] text-[24px] top-[402px] w-[134px]">$ 50.00</p>
      <Category7 />
      <NoTickets7 />
      <Address7 />
      <Date7 />
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[72px] leading-[normal] left-[-18px] not-italic text-[#78aad7] text-[48px] top-[20px] w-[360px]">{`Arts & Craft Workshop`}</p>
    </div>
  );
}

function ButtonBuy8() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[47px] items-center justify-center left-[296px] px-[15px] py-[5px] rounded-[10px] top-[393px] w-[137px]" data-name="Button BUY">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">Buy</p>
    </div>
  );
}

function LucideTicket8() {
  return (
    <div className="absolute h-[26px] left-0 top-[5px] w-[28px]" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 26">
        <g id="lucide/ticket">
          <path d={svgPaths.p32977f00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NoTickets8() {
  return (
    <div className="absolute h-[46px] left-[-19px] top-[297px] w-[302px]" data-name="NO. TICKETS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[39px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[307px]">5,000 tickets available</p>
      <LucideTicket8 />
    </div>
  );
}

function LucideMapPin8() {
  return (
    <div className="absolute h-[29px] left-0 top-[3px] w-[32px]" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 29">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.pd86ce00} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pef2b900} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Address8() {
  return (
    <div className="absolute h-[46px] left-[-21px] top-[244px] w-[225px]" data-name="ADDRESS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[41px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[302px]">Municipal Plaza</p>
      <LucideMapPin8 />
    </div>
  );
}

function LucideCalendarFold8() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[34px]" data-name="lucide/calendar-fold">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 30">
        <g id="lucide/calendar-fold">
          <path d={svgPaths.p36f71c80} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Date8() {
  return (
    <div className="absolute h-[46px] left-[-22px] top-[190px] w-[226px]" data-name="DATE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[42px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[244px]">August 16, 2026</p>
      <LucideCalendarFold8 />
    </div>
  );
}

function Category8() {
  return (
    <div className="absolute h-[25px] left-[296px] top-[7px] w-[137px]" data-name="Category">
      <div className="absolute bg-[#7391ac] h-[28px] left-0 rounded-[10px] top-0 w-[137px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[23px] leading-[normal] left-[68.5px] not-italic text-[16px] text-center text-white top-[2px] w-[115px]">Community</p>
    </div>
  );
}

function Box6Anniversary() {
  return (
    <div className="absolute h-[440px] left-[693px] top-[1321px] w-[433px]" data-name="Box 6 ANNIVERSARY">
      <div className="absolute bg-[rgba(217,217,217,0)] border border-black border-solid h-[497px] left-[-60px] rounded-[30px] top-[-20px] w-[518px]" />
      <ButtonBuy8 />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[29px] leading-[normal] left-[-16px] not-italic text-[#5d5b5b] text-[24px] top-[402px] w-[94px]">$ 0</p>
      <NoTickets8 />
      <Address8 />
      <Date8 />
      <Category8 />
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[72px] leading-[normal] left-[-18px] not-italic text-[#78aad7] text-[48px] top-[20px] w-[360px]">Founding Anniversary</p>
    </div>
  );
}

function ButtonBuy9() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[47px] items-center justify-center left-[293px] px-[15px] py-[5px] rounded-[10px] top-[393px] w-[137px]" data-name="Button BUY">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">Buy</p>
    </div>
  );
}

function LucideTicket9() {
  return (
    <div className="absolute h-[26px] left-0 top-[5px] w-[28px]" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 26">
        <g id="lucide/ticket">
          <path d={svgPaths.p32977f00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NoTickets9() {
  return (
    <div className="absolute h-[46px] left-[-15px] top-[297px] w-[302px]" data-name="NO. TICKETS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[39px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[263px]">300 tickets available</p>
      <LucideTicket9 />
    </div>
  );
}

function LucideMapPin9() {
  return (
    <div className="absolute h-[29px] left-0 top-[3px] w-[32px]" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 29">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.pd86ce00} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pef2b900} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Address9() {
  return (
    <div className="absolute h-[46px] left-[-17px] top-[244px] w-[225px]" data-name="ADDRESS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[41px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[295px]">Municipal Hall of ArayKo</p>
      <LucideMapPin9 />
    </div>
  );
}

function LucideCalendarFold9() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[34px]" data-name="lucide/calendar-fold">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 30">
        <g id="lucide/calendar-fold">
          <path d={svgPaths.p36f71c80} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Date9() {
  return (
    <div className="absolute h-[46px] left-[-18px] top-[190px] w-[226px]" data-name="DATE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[42px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[184px]">July 80, 2026</p>
      <LucideCalendarFold9 />
    </div>
  );
}

function Category9() {
  return (
    <div className="absolute h-[25px] left-[293px] top-[7px] w-[137px]" data-name="Category">
      <div className="absolute bg-[#7391ac] h-[28px] left-0 rounded-[10px] top-0 w-[137px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[23px] leading-[normal] left-[68.5px] not-italic text-[16px] text-center text-white top-[2px] w-[115px]">Government</p>
    </div>
  );
}

function Box5PubCon() {
  return (
    <div className="absolute h-[440px] left-[150px] top-[1321px] w-[430px]" data-name="Box 5 PUB CON">
      <div className="absolute bg-[rgba(217,217,217,0)] border border-black border-solid h-[497px] left-[-65px] rounded-[30px] top-[-20px] w-[518px]" />
      <ButtonBuy9 />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[29px] leading-[normal] left-[-16px] not-italic text-[#5d5b5b] text-[24px] top-[402px] w-[94px]">$ 0</p>
      <NoTickets9 />
      <Address9 />
      <Date9 />
      <Category9 />
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[72px] leading-[normal] left-[-18px] not-italic text-[#78aad7] text-[48px] top-[20px] w-[384px]">Town Hall Meeting</p>
    </div>
  );
}

function ButtonBuy10() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[47px] items-center justify-center left-[296px] px-[15px] py-[5px] rounded-[10px] top-[393px] w-[137px]" data-name="Button BUY">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">Buy</p>
    </div>
  );
}

function Category10() {
  return (
    <div className="absolute h-[25px] left-[296px] top-[7px] w-[137px]" data-name="Category">
      <div className="absolute bg-[#7391ac] h-[28px] left-0 rounded-[10px] top-0 w-[137px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[23px] leading-[normal] left-[68.5px] not-italic text-[16px] text-center text-white top-[2px] w-[115px]">Sports</p>
    </div>
  );
}

function LucideTicket10() {
  return (
    <div className="absolute h-[26px] left-0 top-[5px] w-[28px]" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 26">
        <g id="lucide/ticket">
          <path d={svgPaths.p32977f00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NoTickets10() {
  return (
    <div className="absolute h-[46px] left-[-19px] top-[297px] w-[302px]" data-name="NO. TICKETS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[39px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[263px]">150 tickets available</p>
      <LucideTicket10 />
    </div>
  );
}

function LucideMapPin10() {
  return (
    <div className="absolute h-[29px] left-0 top-[3px] w-[32px]" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 29">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.pd86ce00} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pef2b900} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Address10() {
  return (
    <div className="absolute h-[46px] left-[-21px] top-[244px] w-[225px]" data-name="ADDRESS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[41px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[302px]">Nawindang Court</p>
      <LucideMapPin10 />
    </div>
  );
}

function LucideCalendarFold10() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[34px]" data-name="lucide/calendar-fold">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 30">
        <g id="lucide/calendar-fold">
          <path d={svgPaths.p36f71c80} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Date10() {
  return (
    <div className="absolute h-[46px] left-[-22px] top-[190px] w-[226px]" data-name="DATE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[42px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[244px]">July 74, 2026</p>
      <LucideCalendarFold10 />
    </div>
  );
}

function Box4Basketb() {
  return (
    <div className="absolute h-[440px] left-[1785px] top-[755px] w-[433px]" data-name="Box 4 BASKETB">
      <div className="absolute bg-[rgba(217,217,217,0)] border border-black border-solid h-[497px] left-[-60px] rounded-[30px] top-[-20px] w-[518px]" />
      <ButtonBuy10 />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[29px] leading-[normal] left-[-16px] not-italic text-[#5d5b5b] text-[24px] top-[402px] w-[134px]">$ 0</p>
      <Category10 />
      <NoTickets10 />
      <Address10 />
      <Date10 />
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[72px] leading-[normal] left-[-18px] not-italic text-[#78aad7] text-[48px] top-[20px] w-[360px]">Basketball Tournament</p>
    </div>
  );
}

function ButtonBuy11() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[47px] items-center justify-center left-[296px] px-[15px] py-[5px] rounded-[10px] top-[393px] w-[137px]" data-name="Button BUY">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">Buy</p>
    </div>
  );
}

function Category11() {
  return (
    <div className="absolute h-[25px] left-[296px] top-[7px] w-[137px]" data-name="Category">
      <div className="absolute bg-[#7391ac] h-[28px] left-0 rounded-[10px] top-0 w-[137px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[23px] leading-[normal] left-[68.5px] not-italic text-[16px] text-center text-white top-[2px] w-[115px]">Entertainment</p>
    </div>
  );
}

function LucideTicket11() {
  return (
    <div className="absolute h-[26px] left-0 top-[5px] w-[28px]" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 26">
        <g id="lucide/ticket">
          <path d={svgPaths.p32977f00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NoTickets11() {
  return (
    <div className="absolute h-[46px] left-[-19px] top-[297px] w-[302px]" data-name="NO. TICKETS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[39px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[263px]">1,000 tickets available</p>
      <LucideTicket11 />
    </div>
  );
}

function LucideMapPin11() {
  return (
    <div className="absolute h-[29px] left-0 top-[3px] w-[32px]" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 29">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.pd86ce00} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pef2b900} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Address11() {
  return (
    <div className="absolute h-[46px] left-[-21px] top-[244px] w-[225px]" data-name="ADDRESS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[41px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[302px]">{`Musikverein Opera Hall `}</p>
      <LucideMapPin11 />
    </div>
  );
}

function LucideCalendarFold11() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[34px]" data-name="lucide/calendar-fold">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 30">
        <g id="lucide/calendar-fold">
          <path d={svgPaths.p36f71c80} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Date11() {
  return (
    <div className="absolute h-[46px] left-[-22px] top-[190px] w-[226px]" data-name="DATE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[42px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[244px]">July 40, 2026</p>
      <LucideCalendarFold11 />
    </div>
  );
}

function Box3Concert() {
  return (
    <div className="absolute h-[440px] left-[1239px] top-[755px] w-[433px]" data-name="Box 3 CONCERT">
      <div className="absolute bg-[rgba(217,217,217,0)] border border-black border-solid h-[497px] left-[-60px] rounded-[30px] top-[-20px] w-[518px]" />
      <ButtonBuy11 />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[29px] leading-[normal] left-[-16px] not-italic text-[#5d5b5b] text-[24px] top-[402px] w-[134px]">$ 150.00</p>
      <Category11 />
      <NoTickets11 />
      <Address11 />
      <Date11 />
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[72px] leading-[normal] left-[-18px] not-italic text-[#78aad7] text-[48px] top-[20px] w-[360px]">Mozart Concert</p>
    </div>
  );
}

function ButtonBuy12() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[47px] items-center justify-center left-[296px] px-[15px] py-[5px] rounded-[10px] top-[393px] w-[137px]" data-name="Button BUY">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">Buy</p>
    </div>
  );
}

function Category12() {
  return (
    <div className="absolute h-[25px] left-[296px] top-[7px] w-[137px]" data-name="Category">
      <div className="absolute bg-[#7391ac] h-[28px] left-0 rounded-[10px] top-0 w-[137px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[23px] leading-[normal] left-[68.5px] not-italic text-[16px] text-center text-white top-[2px] w-[115px]">Educational</p>
    </div>
  );
}

function LucideTicket12() {
  return (
    <div className="absolute h-[26px] left-0 top-[5px] w-[28px]" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 26">
        <g id="lucide/ticket">
          <path d={svgPaths.p32977f00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NoTickets12() {
  return (
    <div className="absolute h-[46px] left-[-19px] top-[297px] w-[302px]" data-name="NO. TICKETS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[39px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[263px]">150 tickets available</p>
      <LucideTicket12 />
    </div>
  );
}

function LucideMapPin12() {
  return (
    <div className="absolute h-[29px] left-0 top-[3px] w-[32px]" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 29">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.pd86ce00} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pef2b900} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Address12() {
  return (
    <div className="absolute h-[46px] left-[-21px] top-[244px] w-[225px]" data-name="ADDRESS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[41px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[302px]">Wakanda University</p>
      <LucideMapPin12 />
    </div>
  );
}

function LucideCalendarFold12() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[34px]" data-name="lucide/calendar-fold">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 30">
        <g id="lucide/calendar-fold">
          <path d={svgPaths.p36f71c80} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Date12() {
  return (
    <div className="absolute h-[46px] left-[-22px] top-[190px] w-[226px]" data-name="DATE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[42px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[244px]">June 18, 2026</p>
      <LucideCalendarFold12 />
    </div>
  );
}

function Box2Seminar() {
  return (
    <div className="absolute h-[440px] left-[693px] top-[755px] w-[433px]" data-name="Box 2 SEMINAR">
      <div className="absolute bg-[rgba(217,217,217,0)] border border-black border-solid h-[497px] left-[-60px] rounded-[30px] top-[-20px] w-[518px]" />
      <ButtonBuy12 />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[29px] leading-[normal] left-[-16px] not-italic text-[#5d5b5b] text-[24px] top-[402px] w-[94px]">$ 0.00</p>
      <Category12 />
      <NoTickets12 />
      <Address12 />
      <Date12 />
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[72px] leading-[normal] left-[-18px] not-italic text-[#78aad7] text-[48px] top-[20px] w-[360px]">Career Seminar</p>
    </div>
  );
}

function ButtonBuy13() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[47px] items-center justify-center left-[293px] px-[15px] py-[5px] rounded-[10px] top-[393px] w-[137px]" data-name="Button BUY">
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">Buy</p>
    </div>
  );
}

function LucideTicket13() {
  return (
    <div className="absolute h-[26px] left-0 top-[5px] w-[28px]" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 26">
        <g id="lucide/ticket">
          <path d={svgPaths.p32977f00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function NoTickets13() {
  return (
    <div className="absolute h-[46px] left-[-15px] top-[297px] w-[302px]" data-name="NO. TICKETS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[39px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[263px]">500 tickets available</p>
      <LucideTicket13 />
    </div>
  );
}

function LucideMapPin13() {
  return (
    <div className="absolute h-[29px] left-0 top-[3px] w-[32px]" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 29">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.pd86ce00} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pef2b900} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Address13() {
  return (
    <div className="absolute h-[46px] left-[-17px] top-[244px] w-[225px]" data-name="ADDRESS">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[41px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[184px]">Jurassic Street</p>
      <LucideMapPin13 />
    </div>
  );
}

function LucideCalendarFold13() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[34px]" data-name="lucide/calendar-fold">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 30">
        <g id="lucide/calendar-fold">
          <path d={svgPaths.p36f71c80} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Date13() {
  return (
    <div className="absolute h-[46px] left-[-18px] top-[190px] w-[226px]" data-name="DATE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[42px] not-italic text-[#5d5b5b] text-[24px] top-0 w-[184px]">June 15, 2026</p>
      <LucideCalendarFold13 />
    </div>
  );
}

function Category13() {
  return (
    <div className="absolute h-[25px] left-[293px] top-[7px] w-[137px]" data-name="Category">
      <div className="absolute bg-[#7391ac] h-[28px] left-0 rounded-[10px] top-0 w-[137px]" />
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[23px] leading-[normal] left-[68.5px] not-italic text-[16px] text-center text-white top-[2px] w-[115px]">Community</p>
    </div>
  );
}

function Box1Festival() {
  return (
    <div className="absolute h-[440px] left-[150px] top-[755px] w-[430px]" data-name="Box 1 FESTIVAL">
      <div className="absolute bg-[rgba(217,217,217,0)] border border-black border-solid h-[497px] left-[-65px] rounded-[30px] top-[-20px] w-[518px]" />
      <ButtonBuy13 />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[29px] leading-[normal] left-[-16px] not-italic text-[#5d5b5b] text-[24px] top-[402px] w-[94px]">$ 0</p>
      <NoTickets13 />
      <Address13 />
      <Date13 />
      <Category13 />
      <p className="[word-break:break-word] absolute font-['Poppins:Bold',sans-serif] h-[72px] leading-[normal] left-[-18px] not-italic text-[#78aad7] text-[48px] top-[20px] w-[298px]">Shanghai Festival</p>
    </div>
  );
}

function ButtonEvents() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[60px] items-center justify-center left-0 px-[21px] py-[7px] rounded-[10px] top-0 w-[210px]" data-name="Button Events">
      <div aria-hidden className="absolute border border-[#78aad7] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-center text-white whitespace-nowrap">All Events</p>
    </div>
  );
}

function ButtonCommunity() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-center left-[233px] pl-[3px] py-[7px] rounded-[10px] top-0 w-[223px]" data-name="Button Community">
      <div aria-hidden className="absolute border border-[#5d5b5b] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-black text-center whitespace-nowrap">Community</p>
    </div>
  );
}

function ButtonEducational() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-center left-[479px] pl-px pr-[2px] py-[7px] rounded-[10px] top-0 w-[223px]" data-name="Button EDUCATIONAL">
      <div aria-hidden className="absolute border border-[#5d5b5b] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-black text-center whitespace-nowrap">Educational</p>
    </div>
  );
}

function ButtonEntertainment() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-center left-[725px] pl-[2px] py-[7px] rounded-[10px] top-0 w-[251px]" data-name="Button ENTERTAINMENT">
      <div aria-hidden className="absolute border border-[#5d5b5b] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-black text-center whitespace-nowrap">Entertainment</p>
    </div>
  );
}

function ButtonGovernment() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-center left-[999px] pl-[2px] py-[7px] rounded-[10px] top-0 w-[231px]" data-name="Button GOVERNMENT">
      <div aria-hidden className="absolute border border-[#5d5b5b] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-black text-center whitespace-nowrap">Government</p>
    </div>
  );
}

function ButtonSports() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center justify-center left-[1253px] pl-px py-[7px] rounded-[10px] top-0 w-[156px]" data-name="Button SPORTS">
      <div aria-hidden className="absolute border border-[#5d5b5b] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-black text-center whitespace-nowrap">Sports</p>
    </div>
  );
}

function ButtonsTypesOfEvents() {
  return (
    <div className="absolute h-[60px] left-[94px] top-[544px] w-[1364px]" data-name="Buttons TYPES OF EVENTS">
      <ButtonEvents />
      <ButtonCommunity />
      <ButtonEducational />
      <ButtonEntertainment />
      <ButtonGovernment />
      <ButtonSports />
    </div>
  );
}

function LucideLogOut() {
  return (
    <div className="h-[46px] relative shrink-0 w-[47px]" data-name="lucide/log-out">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 46">
        <g id="lucide/log-out">
          <path d={svgPaths.p26592080} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonLogout() {
  return (
    <div className="absolute content-stretch flex gap-[9px] items-end left-[1730px] top-[23px]" data-name="Button LOGOUT">
      <LucideLogOut />
      <p className="[word-break:break-word] font-['Poppins:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-black text-center whitespace-nowrap">Logout</p>
    </div>
  );
}

function LucideUser() {
  return (
    <div className="h-[45px] relative shrink-0 w-[47px]" data-name="lucide/user">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 45">
        <g id="lucide/user">
          <path d={svgPaths.p3f0f8680} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonProfile() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center left-[1491px] top-[23px]" data-name="Button PROFILE">
      <LucideUser />
      <p className="[word-break:break-word] font-['Poppins:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-black text-center whitespace-nowrap">Profile</p>
    </div>
  );
}

function InputSearch() {
  return (
    <div className="absolute bg-white content-stretch flex h-[88px] items-center justify-center left-[484px] pl-[31px] pr-[777px] py-[17px] rounded-[20px] top-0 w-[957px]" data-name="Input SEARCH">
      <div aria-hidden className="absolute border border-[#5d5b5b] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <p className="[word-break:break-word] font-['Poppins:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap">Search.....</p>
    </div>
  );
}

function LucideHistory() {
  return (
    <div className="h-[48px] relative shrink-0 w-[51px]" data-name="lucide/history">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 48">
        <g id="lucide/history">
          <path d={svgPaths.p6ba800} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonHistory() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[251px] top-[17px]" data-name="Button HISTORY">
      <LucideHistory />
      <p className="[word-break:break-word] font-['Poppins:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-black text-center whitespace-nowrap">History</p>
    </div>
  );
}

function LucideCalendar() {
  return (
    <div className="h-[46px] relative shrink-0 w-[47px]" data-name="lucide/calendar">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 46">
        <g id="lucide/calendar">
          <path d={svgPaths.p21f2b00} id="Vector" stroke="var(--stroke-0, #FFFBFB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonEvents1() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex gap-[12px] h-[88px] items-center left-[-8px] pl-[20px] pr-[22px] py-[20px] rounded-[10px] top-0 w-[206px]" data-name="Button EVENTS">
      <LucideCalendar />
      <p className="[word-break:break-word] font-['Poppins:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#fffbfb] text-[32px] text-center whitespace-nowrap">Events</p>
    </div>
  );
}

function ButtonsInputsHeader() {
  return (
    <div className="absolute h-[88px] left-[351px] top-[81px] w-[1864px]" data-name="Buttons & Inputs HEADER">
      <ButtonLogout />
      <ButtonProfile />
      <InputSearch />
      <ButtonHistory />
      <ButtonEvents1 />
    </div>
  );
}

export default function MainEventsAllEvents() {
  return (
    <div className="bg-white relative size-full" data-name="MAIN - EVENTS & ALL EVENTS">
      <Designs />
      <Box10StreetClean />
      <Box9Checkup />
      <Box12KidCompetition />
      <Box11CulturePerformance />
      <Box10TreePlant />
      <Box9Funrun />
      <Box8TalentShow />
      <Box7Workshop />
      <Box6Anniversary />
      <Box5PubCon />
      <Box4Basketb />
      <Box3Concert />
      <Box2Seminar />
      <Box1Festival />
      <ButtonsTypesOfEvents />
      <ButtonsInputsHeader />
    </div>
  );
}