import svgPaths from "./svg-t7uw9naiol";
import imgLogo from "./cc2e61b111cffc63dc0e0ab4b569556ebceef676.png";

function Designs() {
  return (
    <div className="absolute h-[411px] left-[-0.01px] top-[44px] w-[2253.017px]" data-name="Designs">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Poppins:ExtraBold',sans-serif] h-[72px] leading-[normal] left-[437.52px] not-italic text-[#78aad7] text-[64px] text-center top-[254px] w-[251px]">History</p>
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

function ButtonViewTicket() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[59px] items-center justify-center left-[1390px] pl-[18px] pr-[17px] py-[14px] rounded-[10px] top-[319px] w-[190px]" data-name="Button VIEW TICKET">
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">View Ticket</p>
    </div>
  );
}

function LucideTicket() {
  return (
    <div className="absolute left-0 size-[35px] top-0" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
        <g id="lucide/ticket">
          <path d={svgPaths.p3af21080} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TicketCountTotal() {
  return (
    <div className="absolute h-[46px] left-[43px] top-[269px] w-[639px]" data-name="TICKET COUNT & TOTAL">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] inset-[0_0_0_6.89%] leading-[normal] not-italic text-[#5d5b5b] text-[24px]">1 ticket · $ 0.00 in total</p>
      <LucideTicket />
    </div>
  );
}

function LucideMapPin() {
  return (
    <div className="absolute left-0 size-[40px] top-0" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.p3cbd2300} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pdd0b300} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Place() {
  return (
    <div className="absolute h-[49px] left-[40px] top-[212px] w-[642px]" data-name="PLACE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[47px] not-italic text-[#5d5b5b] text-[24px] top-[3px] w-[595px]">Jurassic Street</p>
      <LucideMapPin />
    </div>
  );
}

function LucideCalendar() {
  return (
    <div className="absolute left-0 size-[40px] top-0" data-name="lucide/calendar">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="lucide/calendar">
          <path d={svgPaths.p2d608e00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function DateTime() {
  return (
    <div className="absolute h-[45px] left-[40px] top-[154px] w-[642px]" data-name="DATE & TIME">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[47px] not-italic text-[#5d5b5b] text-[24px] top-[4px] w-[595px]">June 15, 2026 · 09:00 AM - 02:00 PM</p>
      <LucideCalendar />
    </div>
  );
}

function PreviousTicket() {
  return (
    <div className="absolute h-[408px] left-[309px] top-[1219px] w-[1635px]" data-name="PREVIOUS TICKET">
      <div className="absolute bg-white border border-[#5d5b5b] border-solid h-[408px] left-0 opacity-90 rounded-[20px] top-0 w-[1635px]" />
      <ButtonViewTicket />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] inset-[84.8%_60.86%_9.56%_2.75%] leading-[normal] not-italic text-[#5d5b5b] text-[20px]">Purchased in May 30, 2026</p>
      <TicketCountTotal />
      <Place />
      <DateTime />
      <p className="[word-break:break-word] absolute font-['Poppins:SemiBold',sans-serif] h-[72px] leading-[normal] left-[44px] not-italic text-[#78aad7] text-[48px] top-[38px] w-[475px]">Shanghai Festival</p>
    </div>
  );
}

function ButtonViewTicket1() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex h-[59px] items-center justify-center left-[1390px] pl-[18px] pr-[17px] py-[14px] rounded-[10px] top-[319px] w-[190px]" data-name="Button VIEW TICKET">
      <p className="[word-break:break-word] font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">View Ticket</p>
    </div>
  );
}

function LucideTicket1() {
  return (
    <div className="absolute left-0 size-[35px] top-0" data-name="lucide/ticket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
        <g id="lucide/ticket">
          <path d={svgPaths.p3af21080} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TicketCountTotal1() {
  return (
    <div className="absolute h-[46px] left-[43px] top-[269px] w-[639px]" data-name="TICKET COUNT & TOTAL">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] inset-[0_0_0_6.89%] leading-[normal] not-italic text-[#5d5b5b] text-[24px]">1 ticket · $ 0.00 in total</p>
      <LucideTicket1 />
    </div>
  );
}

function LucideMapPin1() {
  return (
    <div className="absolute left-0 size-[40px] top-0" data-name="lucide/map-pin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="lucide/map-pin">
          <g id="Vector">
            <path d={svgPaths.p3cbd2300} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pdd0b300} stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Place1() {
  return (
    <div className="absolute h-[49px] left-[40px] top-[212px] w-[642px]" data-name="PLACE">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[47px] not-italic text-[#5d5b5b] text-[24px] top-[3px] w-[595px]">Shakira Mountain</p>
      <LucideMapPin1 />
    </div>
  );
}

function LucideCalendar1() {
  return (
    <div className="absolute left-0 size-[40px] top-0" data-name="lucide/calendar">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="lucide/calendar">
          <path d={svgPaths.p2d608e00} id="Vector" stroke="var(--stroke-0, #5D5B5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function DateTime1() {
  return (
    <div className="absolute h-[45px] left-[40px] top-[154px] w-[642px]" data-name="DATE & TIME">
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] h-[46px] leading-[normal] left-[47px] not-italic text-[#5d5b5b] text-[24px] top-[4px] w-[595px]">December 6, 2026 · 05:00 AM - 03:00 PM</p>
      <LucideCalendar1 />
    </div>
  );
}

function CurrentTicket() {
  return (
    <div className="absolute h-[408px] left-[309px] top-[549px] w-[1635px]" data-name="CURRENT TICKET">
      <div className="absolute bg-white border border-[#5d5b5b] border-solid h-[408px] left-0 opacity-90 rounded-[20px] top-0 w-[1635px]" />
      <ButtonViewTicket1 />
      <p className="[word-break:break-word] absolute font-['Poppins:Regular',sans-serif] inset-[84.8%_60.86%_9.56%_2.75%] leading-[normal] not-italic text-[#5d5b5b] text-[20px]">Purchased in November 60, 2026</p>
      <TicketCountTotal1 />
      <Place1 />
      <DateTime1 />
      <p className="[word-break:break-word] absolute font-['Poppins:SemiBold',sans-serif] h-[72px] leading-[normal] left-[44px] not-italic text-[#78aad7] text-[48px] top-[38px] w-[348px]">Tree Planting</p>
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
          <path d={svgPaths.p6ba800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonHistory() {
  return (
    <div className="absolute bg-[#78aad7] content-stretch flex gap-[16px] h-[88px] items-start left-[236px] pb-[23px] pl-[15px] pr-[14px] pt-[17px] rounded-[10px] top-0 w-[208px]" data-name="Button HISTORY">
      <LucideHistory />
      <p className="[word-break:break-word] font-['Poppins:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-center text-white whitespace-nowrap">History</p>
    </div>
  );
}

function LucideCalendar2() {
  return (
    <div className="h-[46px] relative shrink-0 w-[47px]" data-name="lucide/calendar">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 46">
        <g id="lucide/calendar">
          <path d={svgPaths.p21f2b00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonEvents() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[12px] top-[20px]" data-name="Button EVENTS">
      <LucideCalendar2 />
      <p className="[word-break:break-word] font-['Poppins:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-black text-center whitespace-nowrap">Events</p>
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
      <ButtonEvents />
    </div>
  );
}

export default function MainHistory() {
  return (
    <div className="bg-white relative size-full" data-name="MAIN - HISTORY">
      <Designs />
      <PreviousTicket />
      <p className="[word-break:break-word] absolute font-['Poppins:SemiBold',sans-serif] h-[72px] leading-[normal] left-[312px] not-italic text-[#5d5b5b] text-[48px] top-[1127px] w-[251px]">Previous</p>
      <CurrentTicket />
      <p className="[word-break:break-word] absolute font-['Poppins:SemiBold',sans-serif] h-[72px] leading-[normal] left-[312px] not-italic text-[#5d5b5b] text-[48px] top-[457px] w-[251px]">Current</p>
      <ButtonsInputsHeader />
    </div>
  );
}