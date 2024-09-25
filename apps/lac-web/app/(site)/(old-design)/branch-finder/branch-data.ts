type Phone = {
  phoneNo: string;
  link: string;
};

export type BranchType = {
  branchName: string;
  address: string[];
  phone: Phone[];
  fax: string[] | null;
};

export const branchData: BranchType[] = [
  {
    branchName: "Brea/Corporate",
    address: ["895 Columbia St.", "Brea, CA 92821"],
    phone: [
      {
        phoneNo: "(714) 529-1771",
        link: "tel:714529-1771",
      },
      {
        phoneNo: "(800) 422-4389",
        link: "tel:8004224389",
      },
    ],
    fax: ["Fax (800) 446-9452"],
  },
  {
    branchName: "Anaheim",
    address: ["2970 E. La Palma Ave., Unit A", "Anaheim, CA 92806"],
    phone: [
      {
        phoneNo: "(800) 422-4389 ext.1",
        link: "tel:8004224389",
      },
    ],
    fax: null,
  },
  {
    branchName: "Benton",
    address: ["427 Bird St.", "Benton, AR 72015"],
    phone: [
      {
        phoneNo: "(501) 778-6500",
        link: "tel:5017786500",
      },
    ],
    fax: null,
  },
  {
    branchName: "Boise",
    address: ["7564 W. Victory Road", "Boise, ID 83709"],
    phone: [
      {
        phoneNo: "(800) 224-8490",
        link: "tel:8002248490",
      },
    ],
    fax: ["Fax 208-364-4006"],
  },
  {
    branchName: "Denver",
    address: ["4691 Havana St.", "Denver, CO 80238"],
    phone: [
      {
        phoneNo: "(303) 375-1810",
        link: "tel:3033751810",
      },
      {
        phoneNo: "(888) 422-5852",
        link: "tel:8884225852",
      },
    ],
    fax: ["Fax (303) 375-1814"],
  },
  {
    branchName: "Grand Prairie",
    address: ["3080 N. Great Southwest Pkwy.", "Grand Prairie, TX 75050"],
    phone: [
      {
        phoneNo: "(972) 660-8676",
        link: "tel:9726608676",
      },
      {
        phoneNo: "(800) 444-0043",
        link: "tel:8004440043",
      },
    ],
    fax: ["Fax (800) 944-7494"],
  },
  {
    branchName: "Houston",
    address: ["551 Garden Oaks Blvd.", "Houston, TX 77018"],
    phone: [
      {
        phoneNo: "(800) 798-4150",
        link: "tel:8007984150",
      },
    ],
    fax: ["Fax (713) 697-5279"],
  },
  {
    branchName: "Idaho Falls",
    address: ["3353 N 25th E", "Idaho Falls, ID 83401"],
    phone: [
      {
        phoneNo: "(208) 524-3898",
        link: "tel:2085243898",
      },
    ],
    fax: ["Fax (208) 524-3897"],
  },
  {
    branchName: "Lacey",
    address: ["9107 Polaris Lane N/E,", "Suite F", "Lacey, WA 98516"],
    phone: [
      {
        phoneNo: "(800) 452-2621",
        link: "tel:8004522621",
      },
    ],
    fax: ["Fax (866) 548-5024"],
  },
  {
    branchName: "Las Vegas",
    address: ["6125 S. Valley View Blvd.,", "Suite B", "Las Vegas, NV 89118"],
    phone: [
      {
        phoneNo: "(702) 616-2972",
        link: "tel:7026162972",
      },
      {
        phoneNo: "(800) 472-7755",
        link: "tel:8004727755",
      },
    ],
    fax: ["Fax (800) 227-5504"],
  },
  {
    branchName: "Oklahoma City",
    address: ["4201 Charter Ave.", "Oklahoma City, OK 73108"],
    phone: [
      {
        phoneNo: "(800) 444-0043",
        link: "tel:8004440043",
      },
    ],
    fax: ["Fax (800) 944-7494"],
  },
  {
    branchName: "Phoenix",
    address: ["2110 E. Raymond Ave. B-2", "Phoenix, AZ 85040"],
    phone: [
      {
        phoneNo: "(602) 243-0242",
        link: "tel:6022430242",
      },
      {
        phoneNo: "(800) 472-7755",
        link: "8004727755",
      },
    ],
    fax: ["Fax (602) 243-5504", "Fax (800) 227-5504"],
  },
  {
    branchName: "Portland",
    address: ["12848 NE Airport Way", "Portland, OR 97230"],
    phone: [
      {
        phoneNo: "(800) 452-2621",
        link: "tel:8004522621",
      },
    ],
    fax: ["Fax (866) 548-5024"],
  },
  {
    branchName: "Post Falls",
    address: ["730 S Clearwater Loop Road #110", "Post Falls, ID 83854"],
    phone: [
      {
        phoneNo: "(800) 422-4389",
        link: "tel:8004224389",
      },
    ],
    fax: ["Fax (800) 446-9452"],
  },
  {
    branchName: "Salt Lake City",
    address: ["2620 S 900 W", "Salt Lake City, UT 84119"],
    phone: [
      {
        phoneNo: "(801) 285-8800",
        link: "tel:8012858800",
      },
      {
        phoneNo: "(800) 224-8490",
        link: "tel:8002248490",
      },
    ],
    fax: ["Fax (801) 285-8801"],
  },
  {
    branchName: "San Antonio",
    address: ["3023 Interstate Dr.", "San Antonio, TX 78219"],
    phone: [
      {
        phoneNo: "(800) 444-0043",
        link: "tel:8004440043",
      },
    ],
    fax: ["Fax (800) 944-7494"],
  },
  {
    branchName: "San Marcos",
    address: ["999 Linda Vista Dr", "San Marcos, CA 92078"],
    phone: [
      {
        phoneNo: "(800) 422-4389",
        link: "tel:8004224389",
      },
    ],
    fax: null,
  },
  {
    branchName: "St George",
    address: ["476 East Riverside Drive #3A", "St. George, UT 84790"],
    phone: [
      {
        phoneNo: "(801) 285-8800",
        link: "tel:8012858800",
      },
      {
        phoneNo: "(800) 224-8490",
        link: "8002248490",
      },
    ],
    fax: ["Fax (801) 285-8801"],
  },
  {
    branchName: "West Jordan",
    address: ["9826 S. Prosperity Road", "West Jordan, UT 84081"],
    phone: [
      {
        phoneNo: "(801) 954-0900",
        link: "tel:8019540900",
      },
      {
        phoneNo: "(800) 224-8490",
        link: "8002248490",
      },
    ],
    fax: ["Fax (801) 954-0980"],
  },
];
