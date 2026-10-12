export type Category = "indigenous" | "columbus" | "neither";

export type Source = {
  label: string;
  url: string;
};

export type StateRecord = {
  postal: string;
  name: string;
  fips: string;
  category: Category;
  observanceName: string | null;
  alsoColumbusDay: boolean;
  officesClosed: boolean;
  firstObservedYear: number | null;
  permanentLawYear: number | null;
  notes: string | null;
  sources: Source[];
};

export type Milestone = {
  year: number;
  title: string;
  detail: string;
};

const pew: Source = {
  label: "Pew Research Center, October 7, 2025",
  url: "https://www.pewresearch.org/short-reads/2025/10/07/columbus-day-indigenous-peoples-day-or-just-a-regular-monday-it-depends-on-where-you-are/",
};

export const dataCurrentAsOf = "2026-10-12";
export const timelineStart = 1977;
export const currentYear = 2026;

export const milestones: Milestone[] = [
  {
    year: 1977,
    title: "International proposal",
    detail:
      "A delegation of Native nations proposed the observance at the International Conference on Discrimination Against Indigenous Populations in the Americas. No U.S. state adopted it that year.",
  },
  {
    year: 1992,
    title: "Berkeley",
    detail:
      "Berkeley, California, held the first U.S. city observance of Indigenous Peoples’ Day. City actions are not counted as state adoption.",
  },
  {
    year: 2021,
    title: "Presidential proclamation",
    detail:
      "President Biden issued the first presidential proclamation of Indigenous Peoples’ Day. Federal law still names the second Monday in October Columbus Day.",
  },
];

export const states: StateRecord[] = [
  {
    postal: "AL",
    name: "Alabama",
    fips: "01",
    category: "indigenous",
    observanceName: "American Indian Heritage Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: 2000,
    permanentLawYear: 2000,
    notes:
      "The second Monday is also Columbus Day and Fraternal Day. A 2017 proclamation described that October as the 17th anniversary of American Indian Heritage Day.",
    sources: [
      {
        label: "Governor Kay Ivey proclamation, September 28, 2017",
        url: "https://governor.alabama.gov/newsroom/2017/09/american-indian-heritage-day/",
      },
      pew,
    ],
  },
  {
    postal: "AK",
    name: "Alaska",
    fips: "02",
    category: "indigenous",
    observanceName: "Indigenous Peoples Day",
    alsoColumbusDay: false,
    officesClosed: false,
    firstObservedYear: 2017,
    permanentLawYear: 2017,
    notes:
      "House Bill 78 was signed June 24, 2017, and took effect September 22, 2017. It is a designated day of honor, and state offices stay open.",
    sources: [
      {
        label: "Alaska Legislature, HB 78 (2017)",
        url: "https://www.akleg.gov/basis/Bill/detail/30?Root=HB78",
      },
    ],
  },
  {
    postal: "AZ",
    name: "Arizona",
    fips: "04",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes: "Arizona Revised Statutes 1-301 names the second Monday in October Columbus Day.",
    sources: [
      {
        label: "Arizona Revised Statutes 1-301",
        url: "https://www.azleg.gov/ars/1/00301.htm",
      },
      pew,
    ],
  },
  {
    postal: "AR",
    name: "Arkansas",
    fips: "05",
    category: "neither",
    observanceName: null,
    alsoColumbusDay: false,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "The state observed-holiday schedule goes from Labor Day to Veterans Day with no holiday on the second Monday in October.",
    sources: [pew],
  },
  {
    postal: "CA",
    name: "California",
    fips: "06",
    category: "indigenous",
    observanceName: "Indigenous Peoples’ Day",
    alsoColumbusDay: true,
    officesClosed: false,
    firstObservedYear: 2019,
    permanentLawYear: null,
    notes:
      "Governor Newsom’s October 14, 2019 proclamation was the first statewide Indigenous Peoples’ Day proclamation, and later governors have repeated it. Government Code 6700 still names Columbus Day. Native American Day is a different date, the fourth Friday in September.",
    sources: [
      {
        label: "Governor Gavin Newsom proclamation, October 14, 2019",
        url: "https://www.gov.ca.gov/2019/10/14/governor-newsom-issues-proclamation-declaring-indigenous-peoples-day/",
      },
      {
        label: "California Government Code 6700",
        url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=6700.",
      },
    ],
  },
  {
    postal: "CO",
    name: "Colorado",
    fips: "08",
    category: "neither",
    observanceName: null,
    alsoColumbusDay: false,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Colorado replaced Columbus Day with Frances Xavier Cabrini Day and put that holiday on the first Monday in October, a different date.",
    sources: [pew],
  },
  {
    postal: "CT",
    name: "Connecticut",
    fips: "09",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Connecticut General Statutes 1-4 names the second Monday in October Columbus Day.",
    sources: [
      {
        label: "Connecticut General Statutes 1-4",
        url: "https://www.cga.ct.gov/current/pub/chap_002.htm#sec_1-4",
      },
      pew,
    ],
  },
  {
    postal: "DE",
    name: "Delaware",
    fips: "10",
    category: "neither",
    observanceName: null,
    alsoColumbusDay: false,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Delaware dropped Columbus Day in 2009 and gave state workers a floating holiday instead. Title 1, section 501, lists no holiday on the second Monday in October.",
    sources: [
      {
        label: "Delaware Code title 1, section 501",
        url: "https://delcode.delaware.gov/title1/c005/sc01/index.html",
      },
      pew,
    ],
  },
  {
    postal: "FL",
    name: "Florida",
    fips: "12",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Florida Statutes 683.01 names Columbus Day and Farmers’ Day. The paid-holiday list for state agencies skips October, so offices stay open.",
    sources: [
      {
        label: "Florida Statutes 683.01",
        url: "https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0600-0699/0683/Sections/0683.01.html",
      },
      pew,
    ],
  },
  {
    postal: "GA",
    name: "Georgia",
    fips: "13",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes: "Georgia’s published state holiday schedule names the second Monday in October Columbus Day and closes state offices.",
    sources: [pew],
  },
  {
    postal: "HI",
    name: "Hawaii",
    fips: "15",
    category: "indigenous",
    observanceName: "Indigenous Peoples’ Day",
    alsoColumbusDay: false,
    officesClosed: false,
    firstObservedYear: 2023,
    permanentLawYear: 2023,
    notes:
      "Act 152 of 2023, codified at HRS 8-37, names the second Monday Indigenous Peoples’ Day and says it is not a state holiday. Discoverers’ Day, enacted in 1988, is a separate unpaid name for the same Monday.",
    sources: [
      {
        label: "Hawaii Revised Statutes 8-37",
        url: "https://data.capitol.hawaii.gov/hrscurrent/Vol01_Ch0001-0042F/HRS0008/HRS_0008-0037.htm",
      },
    ],
  },
  {
    postal: "ID",
    name: "Idaho",
    fips: "16",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes: "Idaho Code 73-108 lists the second Monday in October as Columbus Day.",
    sources: [
      {
        label: "Idaho Code 73-108",
        url: "https://legislature.idaho.gov/statutesrules/idstat/title73/t73ch1/sect73-108/",
      },
      pew,
    ],
  },
  {
    postal: "IL",
    name: "Illinois",
    fips: "17",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Pew classifies Illinois as a paid Columbus Day holiday for state workers. Illinois also has an unpaid Indigenous observance on a different day.",
    sources: [pew],
  },
  {
    postal: "IN",
    name: "Indiana",
    fips: "18",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes: "The Indiana State Personnel Department holiday schedule lists Columbus Day as a paid state holiday.",
    sources: [pew],
  },
  {
    postal: "IA",
    name: "Iowa",
    fips: "19",
    category: "neither",
    observanceName: null,
    alsoColumbusDay: false,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Iowa’s legal public holidays skip the second Monday in October. Section 1C.5 authorizes an annual proclamation asking that flags be flown on October 12.",
    sources: [
      {
        label: "Iowa Code 1C.1 and 1C.5",
        url: "https://www.legis.iowa.gov/docs/code/1C.5.pdf",
      },
    ],
  },
  {
    postal: "KS",
    name: "Kansas",
    fips: "20",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "K.S.A. 35-107 lists Columbus Day as a legal public holiday. Pew found it is not a paid day off for state workers.",
    sources: [
      {
        label: "Kansas Statutes 35-107",
        url: "https://www.ksrevisor.org/statutes/chapters/ch35/035_001_0007.html",
      },
      pew,
    ],
  },
  {
    postal: "KY",
    name: "Kentucky",
    fips: "21",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "KRS 2.110 names Columbus Day. Pew classifies it as recognition without a paid day off for state workers.",
    sources: [
      {
        label: "Kentucky Revised Statutes 2.110",
        url: "https://apps.legislature.ky.gov/law/statutes/statute.aspx?id=6",
      },
      pew,
    ],
  },
  {
    postal: "LA",
    name: "Louisiana",
    fips: "22",
    category: "columbus",
    observanceName: "Christopher Columbus Day",
    alsoColumbusDay: true,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Revised Statutes 1:55 names Christopher Columbus Day. Pew classifies it as recognition without a paid day off for state workers.",
    sources: [
      {
        label: "Louisiana Revised Statutes 1:55",
        url: "https://www.legis.la.gov/legis/Law.aspx?d=76195",
      },
      pew,
    ],
  },
  {
    postal: "ME",
    name: "Maine",
    fips: "23",
    category: "indigenous",
    observanceName: "Indigenous Peoples Day",
    alsoColumbusDay: false,
    officesClosed: true,
    firstObservedYear: 2019,
    permanentLawYear: 2019,
    notes:
      "Governor Mills signed LD 179 on April 26, 2019, replacing Columbus Day with Indigenous Peoples Day.",
    sources: [
      {
        label: "Maine Public Law 2019, chapter 59",
        url: "https://www.mainelegislature.org/legis/bills/bills_129th/chapters/PUBLIC59.asp",
      },
    ],
  },
  {
    postal: "MD",
    name: "Maryland",
    fips: "24",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Maryland General Provisions 1-111 sets Columbus Day on October 12, or the day Congress designates. American Indian Heritage Day is the Friday after Thanksgiving.",
    sources: [
      {
        label: "Maryland General Provisions 1-111",
        url: "https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=ggp&section=1-111&enactments=false",
      },
      pew,
    ],
  },
  {
    postal: "MA",
    name: "Massachusetts",
    fips: "25",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Chapter 6, section 12V, directs the governor to proclaim the second Monday in October as Columbus Day.",
    sources: [
      {
        label: "Massachusetts General Laws chapter 6, section 12V",
        url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleII/Chapter6/Section12V",
      },
      pew,
    ],
  },
  {
    postal: "MI",
    name: "Michigan",
    fips: "26",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "MCL 435.101 names Columbus Day. Pew classifies it as recognition without a paid day off for state workers.",
    sources: [
      {
        label: "Michigan Compiled Laws 435.101",
        url: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-435-101",
      },
      pew,
    ],
  },
  {
    postal: "MN",
    name: "Minnesota",
    fips: "27",
    category: "indigenous",
    observanceName: "Indigenous Peoples Day",
    alsoColumbusDay: false,
    officesClosed: false,
    firstObservedYear: 2016,
    permanentLawYear: 2023,
    notes:
      "Governor Dayton proclaimed October 10, 2016. Laws of Minnesota 2023, chapter 62, wrote the name into statute. The executive branch does not close for it.",
    sources: [
      {
        label: "Minnesota Statutes 645.44, subdivision 5",
        url: "https://www.revisor.mn.gov/statutes/cite/645.44",
      },
      {
        label: "Governor Mark Dayton proclamation, October 10, 2016",
        url: "https://www.lrl.mn.gov/docs/2018/other/181224/governor/assets/2016_10_10_indigenous_peoples_day_tcm1055-2596806da4.pdf",
      },
    ],
  },
  {
    postal: "MS",
    name: "Mississippi",
    fips: "28",
    category: "neither",
    observanceName: null,
    alsoColumbusDay: false,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Mississippi’s holiday closing calendar goes from Labor Day to Veterans Day with no October holiday.",
    sources: [pew],
  },
  {
    postal: "MO",
    name: "Missouri",
    fips: "29",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Pew classifies Missouri as a paid Columbus Day holiday. Revised Statutes 9.010 places a holiday on the second Monday in October. Missouri also has an unpaid Indigenous observance on a different day.",
    sources: [
      {
        label: "Missouri Revised Statutes 9.010",
        url: "https://revisor.mo.gov/main/OneSection.aspx?section=9.010",
      },
      pew,
    ],
  },
  {
    postal: "MT",
    name: "Montana",
    fips: "30",
    category: "indigenous",
    observanceName: "Indigenous Peoples’ Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: 2025,
    permanentLawYear: 2025,
    notes:
      "Senate Bill 224, signed May 9, 2025, added Indigenous Peoples’ Day alongside Columbus Day on the second Monday in October.",
    sources: [
      {
        label: "Montana Code Annotated 1-1-216, as amended by SB 224 (2025)",
        url: "https://archive.legmt.gov/bills/mca/title_0010/chapter_0010/part_0020/section_0160/0010-0010-0020-0160.html",
      },
      {
        label: "Montana Free Press, May 9, 2025",
        url: "https://montanafreepress.org/2025/05/09/bill-establishing-indigenous-peoples-day-in-montana-becomes-law/",
      },
    ],
  },
  {
    postal: "NE",
    name: "Nebraska",
    fips: "31",
    category: "indigenous",
    observanceName: "Indigenous Peoples’ Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: 2020,
    permanentLawYear: 2020,
    notes:
      "Laws 2020, LB 848, designates the second Monday in October as Indigenous Peoples’ Day and Columbus Day.",
    sources: [
      {
        label: "Nebraska Revised Statute 82-901",
        url: "https://nebraskalegislature.gov/laws/statutes.php?statute=82-901",
      },
    ],
  },
  {
    postal: "NV",
    name: "Nevada",
    fips: "32",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "NRS 236.025, added in 1989, asks the governor to proclaim the second Monday in October as Columbus Day. It is not one of the legal holidays that close offices. Nevada’s Indigenous Peoples Day is August 9.",
    sources: [
      {
        label: "Nevada Revised Statutes 236.025 and 236.037",
        url: "https://www.leg.state.nv.us/nrs/nrs-236.html",
      },
    ],
  },
  {
    postal: "NH",
    name: "New Hampshire",
    fips: "33",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "RSA 288:1 names the second Monday in October Columbus Day. Pew classifies it as recognition without a paid day off for state workers.",
    sources: [
      {
        label: "New Hampshire RSA 288:1",
        url: "https://gc.nh.gov/rsa/html/XXIII/288/288-1.htm",
      },
      pew,
    ],
  },
  {
    postal: "NJ",
    name: "New Jersey",
    fips: "34",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes: "New Jersey’s published state holiday list closes offices for Columbus Day.",
    sources: [pew],
  },
  {
    postal: "NM",
    name: "New Mexico",
    fips: "35",
    category: "indigenous",
    observanceName: "Indigenous Peoples’ Day",
    alsoColumbusDay: false,
    officesClosed: true,
    firstObservedYear: 2019,
    permanentLawYear: 2019,
    notes:
      "In 2019 New Mexico replaced its paid Columbus Day holiday with Indigenous Peoples’ Day. The paid holiday schedule closes state offices.",
    sources: [
      {
        label: "New Mexico Statutes 12-5-2",
        url: "https://nmonesource.com/nmos/nmsa/en/item/4370/index.do",
      },
      pew,
    ],
  },
  {
    postal: "NY",
    name: "New York",
    fips: "36",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes: "The Department of Civil Service legal holiday schedule lists Columbus Day as a paid state holiday.",
    sources: [pew],
  },
  {
    postal: "NC",
    name: "North Carolina",
    fips: "37",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "General Statutes 103-4 names Columbus Day. Pew classifies it as recognition without a paid day off for state workers.",
    sources: [
      {
        label: "North Carolina General Statutes 103-4",
        url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_103/GS_103-4.html",
      },
      pew,
    ],
  },
  {
    postal: "ND",
    name: "North Dakota",
    fips: "38",
    category: "neither",
    observanceName: null,
    alsoColumbusDay: false,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "State offices have no holiday on the second Monday. Century Code 1-03-13 puts Indigenous Peoples Day on the Friday before that Monday. The Friday observance began in 2013 as First Nations Day and was renamed in 2025.",
    sources: [
      {
        label: "North Dakota Century Code 1-03-13",
        url: "https://ndlegis.gov/cencode/t01c03.pdf",
      },
    ],
  },
  {
    postal: "OH",
    name: "Ohio",
    fips: "39",
    category: "indigenous",
    observanceName: "Indigenous Peoples’ Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Ohio Revised Code 1.14 names only Columbus Day, and state offices close. No enacted statewide Indigenous Peoples’ Day statute was found. Pew and Newsweek still count Ohio as observing both, so the start year is left blank.",
    sources: [
      {
        label: "Ohio Revised Code 1.14",
        url: "https://codes.ohio.gov/ohio-revised-code/section-1.14",
      },
      pew,
    ],
  },
  {
    postal: "OK",
    name: "Oklahoma",
    fips: "40",
    category: "indigenous",
    observanceName: "Oklahoma Native American Day",
    alsoColumbusDay: false,
    officesClosed: false,
    firstObservedYear: 2018,
    permanentLawYear: 2018,
    notes:
      "House Bill 2661, effective September 1, 2018, moved Oklahoma Native American Day from the third Monday in November to the second Monday in October. It is not a paid holiday.",
    sources: [
      {
        label: "Oklahoma House Bill 2661 (2018)",
        url: "http://webserver1.lsb.state.ok.us/cf_pdf/2017-18%20ENR/hB/HB2661%20ENR.PDF",
      },
    ],
  },
  {
    postal: "OR",
    name: "Oregon",
    fips: "41",
    category: "indigenous",
    observanceName: "Indigenous Peoples’ Day",
    alsoColumbusDay: false,
    officesClosed: false,
    firstObservedYear: 2017,
    permanentLawYear: 2021,
    notes:
      "The first gubernatorial proclamation was issued in 2017. House Bill 2526, chapter 118 of 2021, took effect June 1, 2021. State offices stay open.",
    sources: [
      {
        label: "Oregon Revised Statutes 187.296",
        url: "https://oregon.public.law/statutes/ors_187.296",
      },
    ],
  },
  {
    postal: "PA",
    name: "Pennsylvania",
    fips: "42",
    category: "indigenous",
    observanceName: "Indigenous Peoples’ Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "The Legal Holiday Law of 1893 names Columbus Day. Later Indigenous Peoples’ Day bills were introduced and not enacted, while state holiday calendars print both names and offices close. The start year is unverified.",
    sources: [
      {
        label: "Pennsylvania House Bill 1983 (2025), not enacted",
        url: "https://www.palegis.us/legislation/bills/2025/hb1983",
      },
      pew,
    ],
  },
  {
    postal: "RI",
    name: "Rhode Island",
    fips: "44",
    category: "indigenous",
    observanceName: "Indigenous Peoples’ Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "General Laws 25-1-1 names only Columbus Day, and offices close. The Department of State also lists Indigenous Peoples’ Day. Pew and Newsweek count the state as observing both. The start year is unverified.",
    sources: [
      {
        label: "Rhode Island General Laws 25-1-1",
        url: "https://webserver.rilegislature.gov/Statutes/TITLE25/25-1/25-1-1.htm",
      },
      {
        label: "WPRI, citing the Rhode Island Department of State",
        url: "https://www.wpri.com/holidays/do-ri-and-mass-officially-recognize-both-columbus-day-and-indigenous-peoples-day/",
      },
      pew,
    ],
  },
  {
    postal: "SC",
    name: "South Carolina",
    fips: "45",
    category: "neither",
    observanceName: null,
    alsoColumbusDay: false,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Code section 53-5-10 runs from Labor Day to Veterans Day with no holiday on the second Monday in October.",
    sources: [
      {
        label: "South Carolina Code 53-5-10",
        url: "https://www.scstatehouse.gov/code/t53c005.php",
      },
    ],
  },
  {
    postal: "SD",
    name: "South Dakota",
    fips: "46",
    category: "indigenous",
    observanceName: "Native Americans’ Day",
    alsoColumbusDay: false,
    officesClosed: true,
    firstObservedYear: 1990,
    permanentLawYear: 1990,
    notes:
      "Session Law 1990, chapter 7, made the second Monday in October Native Americans’ Day, a legal holiday. It is the first statewide October observance in this dataset.",
    sources: [
      {
        label: "South Dakota Codified Law 1-5-1.2",
        url: "https://sdlegislature.gov/Statutes/1-5-1.2",
      },
    ],
  },
  {
    postal: "TN",
    name: "Tennessee",
    fips: "47",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Tennessee designates Columbus Day, and the governor routinely moves the observed day off to the Friday after Thanksgiving. Offices are not closed on the second Monday as a standing rule.",
    sources: [pew],
  },
  {
    postal: "TX",
    name: "Texas",
    fips: "48",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Government Code chapter 662 names Columbus Day and states that public offices stay open. Employees may take it only by giving up another holiday.",
    sources: [
      {
        label: "Texas Government Code chapter 662",
        url: "https://statutes.capitol.texas.gov/Docs/GV/htm/GV.662.htm",
      },
      pew,
    ],
  },
  {
    postal: "UT",
    name: "Utah",
    fips: "49",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Utah Code 63G-1-301 lists Columbus Day among the legal holidays. Utah also has an unpaid Indigenous observance on a different day.",
    sources: [
      {
        label: "Utah Code 63G-1-301",
        url: "https://le.utah.gov/xcode/Title63G/Chapter1/63G-1-S301.html",
      },
      pew,
    ],
  },
  {
    postal: "VT",
    name: "Vermont",
    fips: "50",
    category: "indigenous",
    observanceName: "Indigenous Peoples’ Day",
    alsoColumbusDay: false,
    officesClosed: true,
    firstObservedYear: 2016,
    permanentLawYear: 2019,
    notes:
      "A 2016 gubernatorial proclamation covered that year only. Act 18 was signed May 6, 2019, and took effect July 1, 2019. Bargaining agreements let state employees use the day as a floating holiday.",
    sources: [
      {
        label: "Vermont Statutes title 1, section 371",
        url: "https://legislature.vermont.gov/statutes/section/01/007/00371",
      },
      {
        label: "Vermont Act 18 (2019)",
        url: "https://legislature.vermont.gov/Documents/2020/Docs/ACTS/ACT018/ACT018%20As%20Enacted.pdf",
      },
    ],
  },
  {
    postal: "VA",
    name: "Virginia",
    fips: "51",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes: "Code of Virginia 2.2-3300 also names the same Monday Yorktown Victory Day.",
    sources: [
      {
        label: "Code of Virginia 2.2-3300",
        url: "https://law.lis.virginia.gov/vacode/title2.2/chapter33/section2.2-3300/",
      },
      pew,
    ],
  },
  {
    postal: "WA",
    name: "Washington",
    fips: "53",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "RCW 1.16.050 fixes Columbus Day on October 12 and says legislatively recognized days are not legal holidays. Native American Heritage Day is the Friday after Thanksgiving.",
    sources: [
      {
        label: "Revised Code of Washington 1.16.050",
        url: "https://app.leg.wa.gov/rcw/default.aspx?cite=1.16.050",
      },
      pew,
    ],
  },
  {
    postal: "WV",
    name: "West Virginia",
    fips: "54",
    category: "columbus",
    observanceName: "Columbus Day",
    alsoColumbusDay: true,
    officesClosed: true,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "West Virginia Code 2-2-1 says the second Monday of October is Columbus Day. The state also has an unpaid Indigenous observance on a different day.",
    sources: [
      {
        label: "West Virginia Code 2-2-1",
        url: "https://code.wvlegislature.gov/2-2-1/",
      },
      pew,
    ],
  },
  {
    postal: "WI",
    name: "Wisconsin",
    fips: "55",
    category: "indigenous",
    observanceName: "Indigenous Peoples’ Day",
    alsoColumbusDay: false,
    officesClosed: false,
    firstObservedYear: 2019,
    permanentLawYear: null,
    notes:
      "Statute 995.20 makes the second Monday a legal holiday and gives it no name. Executive Order 50, signed October 8, 2019, names that Monday Indigenous Peoples’ Day. Pew found it is not a paid day off.",
    sources: [
      {
        label: "Wisconsin Executive Order 50",
        url: "https://evers.wi.gov/Documents/EO/EO050-IndigenousPeoplesDay.pdf",
      },
      {
        label: "Wisconsin Statutes 995.20",
        url: "https://docs.legis.wisconsin.gov/statutes/statutes/995/20",
      },
    ],
  },
  {
    postal: "WY",
    name: "Wyoming",
    fips: "56",
    category: "neither",
    observanceName: null,
    alsoColumbusDay: false,
    officesClosed: false,
    firstObservedYear: null,
    permanentLawYear: null,
    notes:
      "Wyoming’s legal holidays skip the second Monday in October. Native American Day falls on the second Friday in May.",
    sources: [pew],
  },
];
