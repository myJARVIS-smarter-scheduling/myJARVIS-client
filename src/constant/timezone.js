const TIMEZONE_LIST = [
  { value: "(GMT-11:00) Niue Time", label: "(GMT-11:00) Niue Time" },
  {
    value: "(GMT-11:00) Samoa Standard Time",
    label: "(GMT-11:00) Samoa Standard Time",
  },
  {
    value: "(GMT-10:00) Cook Islands Standard Time",
    label: "(GMT-10:00) Cook Islands Standard Time",
  },
  {
    value: "(GMT-10:00) Hawaii-Aleutian Standard Time",
    label: "(GMT-10:00) Hawaii-Aleutian Standard Time",
  },
  { value: "(GMT-10:00) Tahiti Time", label: "(GMT-10:00) Tahiti Time" },
  { value: "(GMT-09:30) Marquesas Time", label: "(GMT-09:30) Marquesas Time" },
  { value: "(GMT-09:00) Gambier Time", label: "(GMT-09:00) Gambier Time" },
  {
    value: "(GMT-09:00) Hawaii-Aleutian Time (Adak)",
    label: "(GMT-09:00) Hawaii-Aleutian Time (Adak)",
  },
  {
    value: "(GMT-08:00) Alaska Time - Anchorage",
    label: "(GMT-08:00) Alaska Time - Anchorage",
  },
  {
    value: "(GMT-08:00) Alaska Time - Juneau",
    label: "(GMT-08:00) Alaska Time - Juneau",
  },
  {
    value: "(GMT-08:00) Alaska Time - Metlakatla",
    label: "(GMT-08:00) Alaska Time - Metlakatla",
  },
  {
    value: "(GMT-08:00) Alaska Time - Nome",
    label: "(GMT-08:00) Alaska Time - Nome",
  },
  {
    value: "(GMT-08:00) Alaska Time - Sitka",
    label: "(GMT-08:00) Alaska Time - Sitka",
  },
  {
    value: "(GMT-08:00) Alaska Time - Yakutat",
    label: "(GMT-08:00) Alaska Time - Yakutat",
  },
  { value: "(GMT-08:00) Pitcairn Time", label: "(GMT-08:00) Pitcairn Time" },
  {
    value: "(GMT-07:00) Mexican Pacific Standard Time - Hermosillo",
    label: "(GMT-07:00) Mexican Pacific Standard Time - Hermosillo",
  },
  {
    value: "(GMT-07:00) Mexican Pacific Standard Time - Mazatlan",
    label: "(GMT-07:00) Mexican Pacific Standard Time - Mazatlan",
  },
  {
    value: "(GMT-07:00) Mountain Standard Time - Dawson Creek",
    label: "(GMT-07:00) Mountain Standard Time - Dawson Creek",
  },
  {
    value: "(GMT-07:00) Mountain Standard Time - Fort Nelson",
    label: "(GMT-07:00) Mountain Standard Time - Fort Nelson",
  },
  {
    value: "(GMT-07:00) Mountain Standard Time - Phoenix",
    label: "(GMT-07:00) Mountain Standard Time - Phoenix",
  },
  {
    value: "(GMT-07:00) Pacific Time - Los Angeles",
    label: "(GMT-07:00) Pacific Time - Los Angeles",
  },
  {
    value: "(GMT-07:00) Pacific Time - Tijuana",
    label: "(GMT-07:00) Pacific Time - Tijuana",
  },
  {
    value: "(GMT-07:00) Pacific Time - Vancouver",
    label: "(GMT-07:00) Pacific Time - Vancouver",
  },
  {
    value: "(GMT-07:00) Yukon Time - Dawson",
    label: "(GMT-07:00) Yukon Time - Dawson",
  },
  {
    value: "(GMT-07:00) Yukon Time - Whitehorse",
    label: "(GMT-07:00) Yukon Time - Whitehorse",
  },
  {
    value: "(GMT-06:00) Central Standard Time - Bahía de Banderas",
    label: "(GMT-06:00) Central Standard Time - Bahía de Banderas",
  },
  {
    value: "(GMT-06:00) Central Standard Time - Belize",
    label: "(GMT-06:00) Central Standard Time - Belize",
  },
  {
    value: "(GMT-06:00) Central Standard Time - Chihuahua",
    label: "(GMT-06:00) Central Standard Time - Chihuahua",
  },
  {
    value: "(GMT-06:00) Central Standard Time - Costa Rica",
    label: "(GMT-06:00) Central Standard Time - Costa Rica",
  },
  {
    value: "(GMT-06:00) Central Standard Time - El Salvador",
    label: "(GMT-06:00) Central Standard Time - El Salvador",
  },
  {
    value: "(GMT-06:00) Central Standard Time - Guatemala",
    label: "(GMT-06:00) Central Standard Time - Guatemala",
  },
  {
    value: "(GMT-06:00) Central Standard Time - Managua",
    label: "(GMT-06:00) Central Standard Time - Managua",
  },
  {
    value: "(GMT-06:00) Central Standard Time - Mérida",
    label: "(GMT-06:00) Central Standard Time - Mérida",
  },
  {
    value: "(GMT-06:00) Central Standard Time - Mexico City",
    label: "(GMT-06:00) Central Standard Time - Mexico City",
  },
  {
    value: "(GMT-06:00) Central Standard Time - Monterrey",
    label: "(GMT-06:00) Central Standard Time - Monterrey",
  },
  {
    value: "(GMT-06:00) Central Standard Time - Regina",
    label: "(GMT-06:00) Central Standard Time - Regina",
  },
  {
    value: "(GMT-06:00) Central Standard Time - Swift Current",
    label: "(GMT-06:00) Central Standard Time - Swift Current",
  },
  {
    value: "(GMT-06:00) Central Standard Time - Tegucigalpa",
    label: "(GMT-06:00) Central Standard Time - Tegucigalpa",
  },
  { value: "(GMT-06:00) Galapagos Time", label: "(GMT-06:00) Galapagos Time" },
  {
    value: "(GMT-06:00) Mountain Time - Boise",
    label: "(GMT-06:00) Mountain Time - Boise",
  },
  {
    value: "(GMT-06:00) Mountain Time - Cambridge Bay",
    label: "(GMT-06:00) Mountain Time - Cambridge Bay",
  },
  {
    value: "(GMT-06:00) Mountain Time - Ciudad Juárez",
    label: "(GMT-06:00) Mountain Time - Ciudad Juárez",
  },
  {
    value: "(GMT-06:00) Mountain Time - Denver",
    label: "(GMT-06:00) Mountain Time - Denver",
  },
  {
    value: "(GMT-06:00) Mountain Time - Edmonton",
    label: "(GMT-06:00) Mountain Time - Edmonton",
  },
  {
    value: "(GMT-06:00) Mountain Time - Inuvik",
    label: "(GMT-06:00) Mountain Time - Inuvik",
  },
  {
    value: "(GMT-05:00) Acre Standard Time - Eirunepe",
    label: "(GMT-05:00) Acre Standard Time - Eirunepe",
  },
  {
    value: "(GMT-05:00) Acre Standard Time - Rio Branco",
    label: "(GMT-05:00) Acre Standard Time - Rio Branco",
  },
  {
    value: "(GMT-05:00) Central Time - Beulah, North Dakota",
    label: "(GMT-05:00) Central Time - Beulah, North Dakota",
  },
  {
    value: "(GMT-05:00) Central Time - Center, North Dakota",
    label: "(GMT-05:00) Central Time - Center, North Dakota",
  },
  {
    value: "(GMT-05:00) Central Time - Chicago",
    label: "(GMT-05:00) Central Time - Chicago",
  },
  {
    value: "(GMT-05:00) Central Time - Knox, Indiana",
    label: "(GMT-05:00) Central Time - Knox, Indiana",
  },
  {
    value: "(GMT-05:00) Central Time - Matamoros",
    label: "(GMT-05:00) Central Time - Matamoros",
  },
  {
    value: "(GMT-05:00) Central Time - Menominee",
    label: "(GMT-05:00) Central Time - Menominee",
  },
  {
    value: "(GMT-05:00) Central Time - New Salem, North Dakota",
    label: "(GMT-05:00) Central Time - New Salem, North Dakota",
  },
  {
    value: "(GMT-05:00) Central Time - Ojinaga",
    label: "(GMT-05:00) Central Time - Ojinaga",
  },
  {
    value: "(GMT-05:00) Central Time - Rankin Inlet",
    label: "(GMT-05:00) Central Time - Rankin Inlet",
  },
  {
    value: "(GMT-05:00) Central Time - Resolute",
    label: "(GMT-05:00) Central Time - Resolute",
  },
  {
    value: "(GMT-05:00) Central Time - Tell City, Indiana",
    label: "(GMT-05:00) Central Time - Tell City, Indiana",
  },
  {
    value: "(GMT-05:00) Central Time - Winnipeg",
    label: "(GMT-05:00) Central Time - Winnipeg",
  },
  {
    value: "(GMT-05:00) Colombia Standard Time",
    label: "(GMT-05:00) Colombia Standard Time",
  },
  {
    value: "(GMT-05:00) Easter Island Time",
    label: "(GMT-05:00) Easter Island Time",
  },
  {
    value: "(GMT-05:00) Eastern Standard Time - Cancún",
    label: "(GMT-05:00) Eastern Standard Time - Cancún",
  },
  {
    value: "(GMT-05:00) Eastern Standard Time - Jamaica",
    label: "(GMT-05:00) Eastern Standard Time - Jamaica",
  },
  {
    value: "(GMT-05:00) Eastern Standard Time - Panama",
    label: "(GMT-05:00) Eastern Standard Time - Panama",
  },
  { value: "(GMT-05:00) Ecuador Time", label: "(GMT-05:00) Ecuador Time" },
  {
    value: "(GMT-05:00) Peru Standard Time",
    label: "(GMT-05:00) Peru Standard Time",
  },
  {
    value: "(GMT-04:00) Amazon Standard Time - Boa Vista",
    label: "(GMT-04:00) Amazon Standard Time - Boa Vista",
  },
  {
    value: "(GMT-04:00) Amazon Standard Time - Campo Grande",
    label: "(GMT-04:00) Amazon Standard Time - Campo Grande",
  },
  {
    value: "(GMT-04:00) Amazon Standard Time - Cuiaba",
    label: "(GMT-04:00) Amazon Standard Time - Cuiaba",
  },
  {
    value: "(GMT-04:00) Amazon Standard Time - Manaus",
    label: "(GMT-04:00) Amazon Standard Time - Manaus",
  },
  {
    value: "(GMT-04:00) Amazon Standard Time - Porto Velho",
    label: "(GMT-04:00) Amazon Standard Time - Porto Velho",
  },
  {
    value: "(GMT-04:00) Atlantic Standard Time - Barbados",
    label: "(GMT-04:00) Atlantic Standard Time - Barbados",
  },
  {
    value: "(GMT-04:00) Atlantic Standard Time - Martinique",
    label: "(GMT-04:00) Atlantic Standard Time - Martinique",
  },
  {
    value: "(GMT-04:00) Atlantic Standard Time - Puerto Rico",
    label: "(GMT-04:00) Atlantic Standard Time - Puerto Rico",
  },
  {
    value: "(GMT-04:00) Atlantic Standard Time - Santo Domingo",
    label: "(GMT-04:00) Atlantic Standard Time - Santo Domingo",
  },
  { value: "(GMT-04:00) Bolivia Time", label: "(GMT-04:00) Bolivia Time" },
  { value: "(GMT-04:00) Cuba Time", label: "(GMT-04:00) Cuba Time" },
  {
    value: "(GMT-04:00) Eastern Time - Detroit",
    label: "(GMT-04:00) Eastern Time - Detroit",
  },
  {
    value: "(GMT-04:00) Eastern Time - Grand Turk",
    label: "(GMT-04:00) Eastern Time - Grand Turk",
  },
  {
    value: "(GMT-04:00) Eastern Time - Indianapolis",
    label: "(GMT-04:00) Eastern Time - Indianapolis",
  },
  {
    value: "(GMT-04:00) Eastern Time - Iqaluit",
    label: "(GMT-04:00) Eastern Time - Iqaluit",
  },
  {
    value: "(GMT-04:00) Eastern Time - Louisville",
    label: "(GMT-04:00) Eastern Time - Louisville",
  },
  {
    value: "(GMT-04:00) Eastern Time - Marengo, Indiana",
    label: "(GMT-04:00) Eastern Time - Marengo, Indiana",
  },
  {
    value: "(GMT-04:00) Eastern Time - Monticello, Kentucky",
    label: "(GMT-04:00) Eastern Time - Monticello, Kentucky",
  },
  {
    value: "(GMT-04:00) Eastern Time - New York",
    label: "(GMT-04:00) Eastern Time - New York",
  },
  {
    value: "(GMT-04:00) Eastern Time - Petersburg, Indiana",
    label: "(GMT-04:00) Eastern Time - Petersburg, Indiana",
  },
  {
    value: "(GMT-04:00) Eastern Time - Port-au-Prince",
    label: "(GMT-04:00) Eastern Time - Port-au-Prince",
  },
  {
    value: "(GMT-04:00) Eastern Time - Toronto",
    label: "(GMT-04:00) Eastern Time - Toronto",
  },
  {
    value: "(GMT-04:00) Eastern Time - Vevay, Indiana",
    label: "(GMT-04:00) Eastern Time - Vevay, Indiana",
  },
  {
    value: "(GMT-04:00) Eastern Time - Vincennes, Indiana",
    label: "(GMT-04:00) Eastern Time - Vincennes, Indiana",
  },
  {
    value: "(GMT-04:00) Eastern Time - Winamac, Indiana",
    label: "(GMT-04:00) Eastern Time - Winamac, Indiana",
  },
  { value: "(GMT-04:00) Guyana Time", label: "(GMT-04:00) Guyana Time" },
  { value: "(GMT-04:00) Venezuela Time", label: "(GMT-04:00) Venezuela Time" },
  {
    value: "(GMT-03:00) Argentina Standard Time - Buenos Aires",
    label: "(GMT-03:00) Argentina Standard Time - Buenos Aires",
  },
  {
    value: "(GMT-03:00) Argentina Standard Time - Catamarca",
    label: "(GMT-03:00) Argentina Standard Time - Catamarca",
  },
  {
    value: "(GMT-03:00) Argentina Standard Time - Cordoba",
    label: "(GMT-03:00) Argentina Standard Time - Cordoba",
  },
  {
    value: "(GMT-03:00) Argentina Standard Time - Jujuy",
    label: "(GMT-03:00) Argentina Standard Time - Jujuy",
  },
  {
    value: "(GMT-03:00) Argentina Standard Time - La Rioja",
    label: "(GMT-03:00) Argentina Standard Time - La Rioja",
  },
  {
    value: "(GMT-03:00) Argentina Standard Time - Mendoza",
    label: "(GMT-03:00) Argentina Standard Time - Mendoza",
  },
  {
    value: "(GMT-03:00) Argentina Standard Time - Rio Gallegos",
    label: "(GMT-03:00) Argentina Standard Time - Rio Gallegos",
  },
  {
    value: "(GMT-03:00) Argentina Standard Time - Salta",
    label: "(GMT-03:00) Argentina Standard Time - Salta",
  },
  {
    value: "(GMT-03:00) Argentina Standard Time - San Juan",
    label: "(GMT-03:00) Argentina Standard Time - San Juan",
  },
  {
    value: "(GMT-03:00) Argentina Standard Time - San Luis",
    label: "(GMT-03:00) Argentina Standard Time - San Luis",
  },
  {
    value: "(GMT-03:00) Argentina Standard Time - Tucuman",
    label: "(GMT-03:00) Argentina Standard Time - Tucuman",
  },
  {
    value: "(GMT-03:00) Argentina Standard Time - Ushuaia",
    label: "(GMT-03:00) Argentina Standard Time - Ushuaia",
  },
  {
    value: "(GMT-03:00) Atlantic Time - Bermuda",
    label: "(GMT-03:00) Atlantic Time - Bermuda",
  },
  {
    value: "(GMT-03:00) Atlantic Time - Glace Bay",
    label: "(GMT-03:00) Atlantic Time - Glace Bay",
  },
  {
    value: "(GMT-03:00) Atlantic Time - Goose Bay",
    label: "(GMT-03:00) Atlantic Time - Goose Bay",
  },
  {
    value: "(GMT-03:00) Atlantic Time - Halifax",
    label: "(GMT-03:00) Atlantic Time - Halifax",
  },
  {
    value: "(GMT-03:00) Atlantic Time - Moncton",
    label: "(GMT-03:00) Atlantic Time - Moncton",
  },
  {
    value: "(GMT-03:00) Atlantic Time - Thule",
    label: "(GMT-03:00) Atlantic Time - Thule",
  },
  {
    value: "(GMT-03:00) Brasilia Standard Time - Araguaina",
    label: "(GMT-03:00) Brasilia Standard Time - Araguaina",
  },
  {
    value: "(GMT-03:00) Brasilia Standard Time - Bahia",
    label: "(GMT-03:00) Brasilia Standard Time - Bahia",
  },
  {
    value: "(GMT-03:00) Brasilia Standard Time - Belem",
    label: "(GMT-03:00) Brasilia Standard Time - Belem",
  },
  {
    value: "(GMT-03:00) Brasilia Standard Time - Fortaleza",
    label: "(GMT-03:00) Brasilia Standard Time - Fortaleza",
  },
  {
    value: "(GMT-03:00) Brasilia Standard Time - Maceio",
    label: "(GMT-03:00) Brasilia Standard Time - Maceio",
  },
  {
    value: "(GMT-03:00) Brasilia Standard Time - Recife",
    label: "(GMT-03:00) Brasilia Standard Time - Recife",
  },
  {
    value: "(GMT-03:00) Brasilia Standard Time - Santarem",
    label: "(GMT-03:00) Brasilia Standard Time - Santarem",
  },
  {
    value: "(GMT-03:00) Brasilia Standard Time - Sao Paulo",
    label: "(GMT-03:00) Brasilia Standard Time - Sao Paulo",
  },
  { value: "(GMT-03:00) Chile Time", label: "(GMT-03:00) Chile Time" },
  {
    value: "(GMT-03:00) Falkland Islands Standard Time",
    label: "(GMT-03:00) Falkland Islands Standard Time",
  },
  {
    value: "(GMT-03:00) French Guiana Time",
    label: "(GMT-03:00) French Guiana Time",
  },
  { value: "(GMT-03:00) Palmer Time", label: "(GMT-03:00) Palmer Time" },
  { value: "(GMT-03:00) Paraguay Time", label: "(GMT-03:00) Paraguay Time" },
  {
    value: "(GMT-03:00) Punta Arenas Time",
    label: "(GMT-03:00) Punta Arenas Time",
  },
  { value: "(GMT-03:00) Rothera Time", label: "(GMT-03:00) Rothera Time" },
  { value: "(GMT-03:00) Suriname Time", label: "(GMT-03:00) Suriname Time" },
  {
    value: "(GMT-03:00) Uruguay Standard Time",
    label: "(GMT-03:00) Uruguay Standard Time",
  },
  {
    value: "(GMT-02:30) Newfoundland Time",
    label: "(GMT-02:30) Newfoundland Time",
  },
  {
    value: "(GMT-02:00) Fernando de Noronha Standard Time",
    label: "(GMT-02:00) Fernando de Noronha Standard Time",
  },
  {
    value: "(GMT-02:00) South Georgia Time",
    label: "(GMT-02:00) South Georgia Time",
  },
  {
    value: "(GMT-02:00) St. Pierre & Miquelon Time",
    label: "(GMT-02:00) St. Pierre & Miquelon Time",
  },
  {
    value: "(GMT-02:00) West Greenland Time",
    label: "(GMT-02:00) West Greenland Time",
  },
  { value: "(GMT-01:00) Azores Time", label: "(GMT-01:00) Azores Time" },
  {
    value: "(GMT-01:00) Cape Verde Standard Time",
    label: "(GMT-01:00) Cape Verde Standard Time",
  },
  {
    value: "(GMT-01:00) East Greenland Time",
    label: "(GMT-01:00) East Greenland Time",
  },
  {
    value: "(GMT+00:00) Coordinated Universal Time",
    label: "(GMT+00:00) Coordinated Universal Time",
  },
  {
    value: "(GMT+00:00) Greenwich Mean Time",
    label: "(GMT+00:00) Greenwich Mean Time",
  },
  {
    value: "(GMT+00:00) Greenwich Mean Time - Abidjan",
    label: "(GMT+00:00) Greenwich Mean Time - Abidjan",
  },
  {
    value: "(GMT+00:00) Greenwich Mean Time - Bissau",
    label: "(GMT+00:00) Greenwich Mean Time - Bissau",
  },
  {
    value: "(GMT+00:00) Greenwich Mean Time - Danmarkshavn",
    label: "(GMT+00:00) Greenwich Mean Time - Danmarkshavn",
  },
  {
    value: "(GMT+00:00) Greenwich Mean Time - Monrovia",
    label: "(GMT+00:00) Greenwich Mean Time - Monrovia",
  },
  {
    value: "(GMT+00:00) Greenwich Mean Time - Reykjavik",
    label: "(GMT+00:00) Greenwich Mean Time - Reykjavik",
  },
  {
    value: "(GMT+00:00) Greenwich Mean Time - São Tomé",
    label: "(GMT+00:00) Greenwich Mean Time - São Tomé",
  },
  { value: "(GMT+00:00) Ireland Time", label: "(GMT+00:00) Ireland Time" },
  { value: "(GMT+00:00) Morocco Time", label: "(GMT+00:00) Morocco Time" },
  { value: "(GMT+00:00) Troll Time", label: "(GMT+00:00) Troll Time" },
  {
    value: "(GMT+00:00) United Kingdom Time",
    label: "(GMT+00:00) United Kingdom Time",
  },
  {
    value: "(GMT+00:00) Western European Time - Canary",
    label: "(GMT+00:00) Western European Time - Canary",
  },
  {
    value: "(GMT+00:00) Western European Time - Faroe",
    label: "(GMT+00:00) Western European Time - Faroe",
  },
  {
    value: "(GMT+00:00) Western European Time - Lisbon",
    label: "(GMT+00:00) Western European Time - Lisbon",
  },
  {
    value: "(GMT+00:00) Western European Time - Madeira",
    label: "(GMT+00:00) Western European Time - Madeira",
  },
  {
    value: "(GMT+00:00) Western Sahara Time",
    label: "(GMT+00:00) Western Sahara Time",
  },
  {
    value: "(GMT+01:00) Central European Standard Time - Algiers",
    label: "(GMT+01:00) Central European Standard Time - Algiers",
  },
  {
    value: "(GMT+01:00) Central European Standard Time - Tunis",
    label: "(GMT+01:00) Central European Standard Time - Tunis",
  },
  {
    value: "(GMT+01:00) Central European Time - Amsterdam",
    label: "(GMT+01:00) Central European Time - Amsterdam",
  },
  {
    value: "(GMT+01:00) Central European Time - Andorra",
    label: "(GMT+01:00) Central European Time - Andorra",
  },
  {
    value: "(GMT+01:00) Central European Time - Belgrade",
    label: "(GMT+01:00) Central European Time - Belgrade",
  },
  {
    value: "(GMT+01:00) Central European Time - Berlin",
    label: "(GMT+01:00) Central European Time - Berlin",
  },
  {
    value: "(GMT+01:00) Central European Time - Brussels",
    label: "(GMT+01:00) Central European Time - Brussels",
  },
  {
    value: "(GMT+01:00) Central European Time - Budapest",
    label: "(GMT+01:00) Central European Time - Budapest",
  },
  {
    value: "(GMT+01:00) Central European Time - Ceuta",
    label: "(GMT+01:00) Central European Time - Ceuta",
  },
  {
    value: "(GMT+01:00) Central European Time - Copenhagen",
    label: "(GMT+01:00) Central European Time - Copenhagen",
  },
  {
    value: "(GMT+01:00) Central European Time - Gibraltar",
    label: "(GMT+01:00) Central European Time - Gibraltar",
  },
  {
    value: "(GMT+01:00) Central European Time - Luxembourg",
    label: "(GMT+01:00) Central European Time - Luxembourg",
  },
  {
    value: "(GMT+01:00) Central European Time - Madrid",
    label: "(GMT+01:00) Central European Time - Madrid",
  },
  {
    value: "(GMT+01:00) Central European Time - Malta",
    label: "(GMT+01:00) Central European Time - Malta",
  },
  {
    value: "(GMT+01:00) Central European Time - Monaco",
    label: "(GMT+01:00) Central European Time - Monaco",
  },
  {
    value: "(GMT+01:00) Central European Time - Oslo",
    label: "(GMT+01:00) Central European Time - Oslo",
  },
  {
    value: "(GMT+01:00) Central European Time - Paris",
    label: "(GMT+01:00) Central European Time - Paris",
  },
  {
    value: "(GMT+01:00) Central European Time - Prague",
    label: "(GMT+01:00) Central European Time - Prague",
  },
  {
    value: "(GMT+01:00) Central European Time - Rome",
    label: "(GMT+01:00) Central European Time - Rome",
  },
  {
    value: "(GMT+01:00) Central European Time - Stockholm",
    label: "(GMT+01:00) Central European Time - Stockholm",
  },
  {
    value: "(GMT+01:00) Central European Time - Tirane",
    label: "(GMT+01:00) Central European Time - Tirane",
  },
  {
    value: "(GMT+01:00) Central European Time - Vienna",
    label: "(GMT+01:00) Central European Time - Vienna",
  },
  {
    value: "(GMT+01:00) Central European Time - Warsaw",
    label: "(GMT+01:00) Central European Time - Warsaw",
  },
  {
    value: "(GMT+01:00) Central European Time - Zurich",
    label: "(GMT+01:00) Central European Time - Zurich",
  },
  {
    value: "(GMT+01:00) West Africa Standard Time - Lagos",
    label: "(GMT+01:00) West Africa Standard Time - Lagos",
  },
  {
    value: "(GMT+01:00) West Africa Standard Time - Ndjamena",
    label: "(GMT+01:00) West Africa Standard Time - Ndjamena",
  },
  {
    value: "(GMT+02:00) Central Africa Time - Juba",
    label: "(GMT+02:00) Central Africa Time - Juba",
  },
  {
    value: "(GMT+02:00) Central Africa Time - Khartoum",
    label: "(GMT+02:00) Central Africa Time - Khartoum",
  },
  {
    value: "(GMT+02:00) Central Africa Time - Maputo",
    label: "(GMT+02:00) Central Africa Time - Maputo",
  },
  {
    value: "(GMT+02:00) Central Africa Time - Windhoek",
    label: "(GMT+02:00) Central Africa Time - Windhoek",
  },
  {
    value: "(GMT+02:00) Eastern European Standard Time - Kaliningrad",
    label: "(GMT+02:00) Eastern European Standard Time - Kaliningrad",
  },
  {
    value: "(GMT+02:00) Eastern European Standard Time - Tripoli",
    label: "(GMT+02:00) Eastern European Standard Time - Tripoli",
  },
  {
    value: "(GMT+02:00) Eastern European Time - Athens",
    label: "(GMT+02:00) Eastern European Time - Athens",
  },
  {
    value: "(GMT+02:00) Eastern European Time - Beirut",
    label: "(GMT+02:00) Eastern European Time - Beirut",
  },
  {
    value: "(GMT+02:00) Eastern European Time - Bucharest",
    label: "(GMT+02:00) Eastern European Time - Bucharest",
  },
  {
    value: "(GMT+02:00) Eastern European Time - Cairo",
    label: "(GMT+02:00) Eastern European Time - Cairo",
  },
  {
    value: "(GMT+02:00) Eastern European Time - Chisinau",
    label: "(GMT+02:00) Eastern European Time - Chisinau",
  },
  {
    value: "(GMT+02:00) Eastern European Time - Gaza",
    label: "(GMT+02:00) Eastern European Time - Gaza",
  },
  {
    value: "(GMT+02:00) Eastern European Time - Hebron",
    label: "(GMT+02:00) Eastern European Time - Hebron",
  },
  {
    value: "(GMT+02:00) Eastern European Time - Helsinki",
    label: "(GMT+02:00) Eastern European Time - Helsinki",
  },
  {
    value: "(GMT+02:00) Eastern European Time - Kyiv",
    label: "(GMT+02:00) Eastern European Time - Kyiv",
  },
  {
    value: "(GMT+02:00) Eastern European Time - Nicosia",
    label: "(GMT+02:00) Eastern European Time - Nicosia",
  },
  {
    value: "(GMT+02:00) Eastern European Time - Riga",
    label: "(GMT+02:00) Eastern European Time - Riga",
  },
  {
    value: "(GMT+02:00) Eastern European Time - Sofia",
    label: "(GMT+02:00) Eastern European Time - Sofia",
  },
  {
    value: "(GMT+02:00) Eastern European Time - Tallinn",
    label: "(GMT+02:00) Eastern European Time - Tallinn",
  },
  {
    value: "(GMT+02:00) Eastern European Time - Vilnius",
    label: "(GMT+02:00) Eastern European Time - Vilnius",
  },
  { value: "(GMT+02:00) Famagusta Time", label: "(GMT+02:00) Famagusta Time" },
  { value: "(GMT+02:00) Israel Time", label: "(GMT+02:00) Israel Time" },
  {
    value: "(GMT+02:00) South Africa Standard Time",
    label: "(GMT+02:00) South Africa Standard Time",
  },
  {
    value: "(GMT+03:00) Arabian Standard Time - Baghdad",
    label: "(GMT+03:00) Arabian Standard Time - Baghdad",
  },
  {
    value: "(GMT+03:00) Arabian Standard Time - Qatar",
    label: "(GMT+03:00) Arabian Standard Time - Qatar",
  },
  {
    value: "(GMT+03:00) Arabian Standard Time - Riyadh",
    label: "(GMT+03:00) Arabian Standard Time - Riyadh",
  },
  {
    value: "(GMT+03:00) East Africa Time",
    label: "(GMT+03:00) East Africa Time",
  },
  { value: "(GMT+03:00) Jordan Time", label: "(GMT+03:00) Jordan Time" },
  { value: "(GMT+03:00) Kirov Time", label: "(GMT+03:00) Kirov Time" },
  {
    value: "(GMT+03:00) Moscow Standard Time - Minsk",
    label: "(GMT+03:00) Moscow Standard Time - Minsk",
  },
  {
    value: "(GMT+03:00) Moscow Standard Time - Moscow",
    label: "(GMT+03:00) Moscow Standard Time - Moscow",
  },
  {
    value: "(GMT+03:00) Moscow Standard Time - Simferopol",
    label: "(GMT+03:00) Moscow Standard Time - Simferopol",
  },
  { value: "(GMT+03:00) Syria Time", label: "(GMT+03:00) Syria Time" },
  { value: "(GMT+03:00) Türkiye Time", label: "(GMT+03:00) Türkiye Time" },
  {
    value: "(GMT+03:00) Volgograd Standard Time",
    label: "(GMT+03:00) Volgograd Standard Time",
  },
  {
    value: "(GMT+03:30) Iran Standard Time",
    label: "(GMT+03:30) Iran Standard Time",
  },
  {
    value: "(GMT+04:00) Armenia Standard Time",
    label: "(GMT+04:00) Armenia Standard Time",
  },
  { value: "(GMT+04:00) Astrakhan Time", label: "(GMT+04:00) Astrakhan Time" },
  {
    value: "(GMT+04:00) Azerbaijan Standard Time",
    label: "(GMT+04:00) Azerbaijan Standard Time",
  },
  {
    value: "(GMT+04:00) Georgia Standard Time",
    label: "(GMT+04:00) Georgia Standard Time",
  },
  {
    value: "(GMT+04:00) Gulf Standard Time",
    label: "(GMT+04:00) Gulf Standard Time",
  },
  {
    value: "(GMT+04:00) Mauritius Standard Time",
    label: "(GMT+04:00) Mauritius Standard Time",
  },
  { value: "(GMT+04:00) Réunion Time", label: "(GMT+04:00) Réunion Time" },
  {
    value: "(GMT+04:00) Samara Standard Time",
    label: "(GMT+04:00) Samara Standard Time",
  },
  { value: "(GMT+04:00) Saratov Time", label: "(GMT+04:00) Saratov Time" },
  {
    value: "(GMT+04:00) Seychelles Time",
    label: "(GMT+04:00) Seychelles Time",
  },
  { value: "(GMT+04:00) Ulyanovsk Time", label: "(GMT+04:00) Ulyanovsk Time" },
  {
    value: "(GMT+04:30) Afghanistan Time",
    label: "(GMT+04:30) Afghanistan Time",
  },
  {
    value: "(GMT+05:00) French Southern & Antarctic Time",
    label: "(GMT+05:00) French Southern & Antarctic Time",
  },
  { value: "(GMT+05:00) Maldives Time", label: "(GMT+05:00) Maldives Time" },
  { value: "(GMT+05:00) Mawson Time", label: "(GMT+05:00) Mawson Time" },
  {
    value: "(GMT+05:00) Pakistan Standard Time",
    label: "(GMT+05:00) Pakistan Standard Time",
  },
  {
    value: "(GMT+05:00) Tajikistan Time",
    label: "(GMT+05:00) Tajikistan Time",
  },
  {
    value: "(GMT+05:00) Turkmenistan Standard Time",
    label: "(GMT+05:00) Turkmenistan Standard Time",
  },
  {
    value: "(GMT+05:00) Uzbekistan Standard Time - Samarkand",
    label: "(GMT+05:00) Uzbekistan Standard Time - Samarkand",
  },
  {
    value: "(GMT+05:00) Uzbekistan Standard Time - Tashkent",
    label: "(GMT+05:00) Uzbekistan Standard Time - Tashkent",
  },
  { value: "(GMT+05:00) Vostok Time", label: "(GMT+05:00) Vostok Time" },
  {
    value: "(GMT+05:00) West Kazakhstan Time - Almaty",
    label: "(GMT+05:00) West Kazakhstan Time - Almaty",
  },
  {
    value: "(GMT+05:00) West Kazakhstan Time - Aqtau",
    label: "(GMT+05:00) West Kazakhstan Time - Aqtau",
  },
  {
    value: "(GMT+05:00) West Kazakhstan Time - Aqtobe",
    label: "(GMT+05:00) West Kazakhstan Time - Aqtobe",
  },
  {
    value: "(GMT+05:00) West Kazakhstan Time - Atyrau",
    label: "(GMT+05:00) West Kazakhstan Time - Atyrau",
  },
  {
    value: "(GMT+05:00) West Kazakhstan Time - Kostanay",
    label: "(GMT+05:00) West Kazakhstan Time - Kostanay",
  },
  {
    value: "(GMT+05:00) West Kazakhstan Time - Oral",
    label: "(GMT+05:00) West Kazakhstan Time - Oral",
  },
  {
    value: "(GMT+05:00) West Kazakhstan Time - Qyzylorda",
    label: "(GMT+05:00) West Kazakhstan Time - Qyzylorda",
  },
  {
    value: "(GMT+05:00) Yekaterinburg Standard Time",
    label: "(GMT+05:00) Yekaterinburg Standard Time",
  },
  {
    value: "(GMT+05:30) India Standard Time - Colombo",
    label: "(GMT+05:30) India Standard Time - Colombo",
  },
  {
    value: "(GMT+05:30) India Standard Time - Kolkata",
    label: "(GMT+05:30) India Standard Time - Kolkata",
  },
  { value: "(GMT+05:45) Nepal Time", label: "(GMT+05:45) Nepal Time" },
  {
    value: "(GMT+06:00) Bangladesh Standard Time",
    label: "(GMT+06:00) Bangladesh Standard Time",
  },
  { value: "(GMT+06:00) Bhutan Time", label: "(GMT+06:00) Bhutan Time" },
  {
    value: "(GMT+06:00) Indian Ocean Time",
    label: "(GMT+06:00) Indian Ocean Time",
  },
  {
    value: "(GMT+06:00) Kyrgyzstan Time",
    label: "(GMT+06:00) Kyrgyzstan Time",
  },
  {
    value: "(GMT+06:00) Omsk Standard Time",
    label: "(GMT+06:00) Omsk Standard Time",
  },
  { value: "(GMT+06:00) Urumqi Time", label: "(GMT+06:00) Urumqi Time" },
  {
    value: "(GMT+06:30) Cocos Islands Time",
    label: "(GMT+06:30) Cocos Islands Time",
  },
  { value: "(GMT+06:30) Myanmar Time", label: "(GMT+06:30) Myanmar Time" },
  { value: "(GMT+07:00) Barnaul Time", label: "(GMT+07:00) Barnaul Time" },
  {
    value: "(GMT+07:00) Christmas Island Time",
    label: "(GMT+07:00) Christmas Island Time",
  },
  { value: "(GMT+07:00) Davis Time", label: "(GMT+07:00) Davis Time" },
  {
    value: "(GMT+07:00) Hovd Standard Time",
    label: "(GMT+07:00) Hovd Standard Time",
  },
  {
    value: "(GMT+07:00) Indochina Time - Bangkok",
    label: "(GMT+07:00) Indochina Time - Bangkok",
  },
  {
    value: "(GMT+07:00) Indochina Time - Ho Chi Minh City",
    label: "(GMT+07:00) Indochina Time - Ho Chi Minh City",
  },
  {
    value: "(GMT+07:00) Krasnoyarsk Standard Time - Krasnoyarsk",
    label: "(GMT+07:00) Krasnoyarsk Standard Time - Krasnoyarsk",
  },
  {
    value: "(GMT+07:00) Krasnoyarsk Standard Time - Novokuznetsk",
    label: "(GMT+07:00) Krasnoyarsk Standard Time - Novokuznetsk",
  },
  {
    value: "(GMT+07:00) Novosibirsk Standard Time",
    label: "(GMT+07:00) Novosibirsk Standard Time",
  },
  { value: "(GMT+07:00) Tomsk Time", label: "(GMT+07:00) Tomsk Time" },
  {
    value: "(GMT+07:00) Western Indonesia Time - Jakarta",
    label: "(GMT+07:00) Western Indonesia Time - Jakarta",
  },
  {
    value: "(GMT+07:00) Western Indonesia Time - Pontianak",
    label: "(GMT+07:00) Western Indonesia Time - Pontianak",
  },
  {
    value: "(GMT+08:00) Australian Western Standard Time",
    label: "(GMT+08:00) Australian Western Standard Time",
  },
  {
    value: "(GMT+08:00) Brunei Darussalam Time",
    label: "(GMT+08:00) Brunei Darussalam Time",
  },
  { value: "(GMT+08:00) Casey Time", label: "(GMT+08:00) Casey Time" },
  {
    value: "(GMT+08:00) Central Indonesia Time",
    label: "(GMT+08:00) Central Indonesia Time",
  },
  {
    value: "(GMT+08:00) China Standard Time - Macao",
    label: "(GMT+08:00) China Standard Time - Macao",
  },
  {
    value: "(GMT+08:00) China Standard Time - Shanghai",
    label: "(GMT+08:00) China Standard Time - Shanghai",
  },
  {
    value: "(GMT+08:00) Hong Kong Standard Time",
    label: "(GMT+08:00) Hong Kong Standard Time",
  },
  {
    value: "(GMT+08:00) Irkutsk Standard Time",
    label: "(GMT+08:00) Irkutsk Standard Time",
  },
  {
    value: "(GMT+08:00) Malaysia Time - Kuala Lumpur",
    label: "(GMT+08:00) Malaysia Time - Kuala Lumpur",
  },
  {
    value: "(GMT+08:00) Malaysia Time - Kuching",
    label: "(GMT+08:00) Malaysia Time - Kuching",
  },
  {
    value: "(GMT+08:00) Philippine Standard Time",
    label: "(GMT+08:00) Philippine Standard Time",
  },
  {
    value: "(GMT+08:00) Singapore Standard Time",
    label: "(GMT+08:00) Singapore Standard Time",
  },
  {
    value: "(GMT+08:00) Taipei Standard Time",
    label: "(GMT+08:00) Taipei Standard Time",
  },
  {
    value: "(GMT+08:00) Ulaanbaatar Standard Time - Choibalsan",
    label: "(GMT+08:00) Ulaanbaatar Standard Time - Choibalsan",
  },
  {
    value: "(GMT+08:00) Ulaanbaatar Standard Time - Ulaanbaatar",
    label: "(GMT+08:00) Ulaanbaatar Standard Time - Ulaanbaatar",
  },
  {
    value: "(GMT+08:45) Australian Central Western Standard Time",
    label: "(GMT+08:45) Australian Central Western Standard Time",
  },
  {
    value: "(GMT+09:00) East Timor Time",
    label: "(GMT+09:00) East Timor Time",
  },
  {
    value: "(GMT+09:00) Eastern Indonesia Time",
    label: "(GMT+09:00) Eastern Indonesia Time",
  },
  {
    value: "(GMT+09:00) Japan Standard Time",
    label: "(GMT+09:00) Japan Standard Time",
  },
  {
    value: "(GMT+09:00) Korean Standard Time - Pyongyang",
    label: "(GMT+09:00) Korean Standard Time - Pyongyang",
  },
  {
    value: "(GMT+09:00) Korean Standard Time - Seoul",
    label: "(GMT+09:00) Korean Standard Time - Seoul",
  },
  { value: "(GMT+09:00) Palau Time", label: "(GMT+09:00) Palau Time" },
  {
    value: "(GMT+09:00) Yakutsk Standard Time - Chita",
    label: "(GMT+09:00) Yakutsk Standard Time - Chita",
  },
  {
    value: "(GMT+09:00) Yakutsk Standard Time - Khandyga",
    label: "(GMT+09:00) Yakutsk Standard Time - Khandyga",
  },
  {
    value: "(GMT+09:00) Yakutsk Standard Time - Yakutsk",
    label: "(GMT+09:00) Yakutsk Standard Time - Yakutsk",
  },
  {
    value: "(GMT+09:30) Australian Central Standard Time",
    label: "(GMT+09:30) Australian Central Standard Time",
  },
  {
    value: "(GMT+10:00) Australian Eastern Standard Time - Brisbane",
    label: "(GMT+10:00) Australian Eastern Standard Time - Brisbane",
  },
  {
    value: "(GMT+10:00) Australian Eastern Standard Time - Lindeman",
    label: "(GMT+10:00) Australian Eastern Standard Time - Lindeman",
  },
  {
    value: "(GMT+10:00) Chamorro Standard Time",
    label: "(GMT+10:00) Chamorro Standard Time",
  },
  { value: "(GMT+10:00) Chuuk Time", label: "(GMT+10:00) Chuuk Time" },
  {
    value: "(GMT+10:00) Papua New Guinea Time",
    label: "(GMT+10:00) Papua New Guinea Time",
  },
  {
    value: "(GMT+10:00) Vladivostok Standard Time - Ust-Nera",
    label: "(GMT+10:00) Vladivostok Standard Time - Ust-Nera",
  },
  {
    value: "(GMT+10:00) Vladivostok Standard Time - Vladivostok",
    label: "(GMT+10:00) Vladivostok Standard Time - Vladivostok",
  },
  {
    value: "(GMT+10:30) Central Australia Time - Adelaide",
    label: "(GMT+10:30) Central Australia Time - Adelaide",
  },
  {
    value: "(GMT+10:30) Central Australia Time - Broken Hill",
    label: "(GMT+10:30) Central Australia Time - Broken Hill",
  },
  {
    value: "(GMT+11:00) Bougainville Time",
    label: "(GMT+11:00) Bougainville Time",
  },
  {
    value: "(GMT+11:00) Eastern Australia Time - Hobart",
    label: "(GMT+11:00) Eastern Australia Time - Hobart",
  },
  {
    value: "(GMT+11:00) Eastern Australia Time - Macquarie",
    label: "(GMT+11:00) Eastern Australia Time - Macquarie",
  },
  {
    value: "(GMT+11:00) Eastern Australia Time - Melbourne",
    label: "(GMT+11:00) Eastern Australia Time - Melbourne",
  },
  {
    value: "(GMT+11:00) Eastern Australia Time - Sydney",
    label: "(GMT+11:00) Eastern Australia Time - Sydney",
  },
  { value: "(GMT+11:00) Kosrae Time", label: "(GMT+11:00) Kosrae Time" },
  { value: "(GMT+11:00) Lord Howe Time", label: "(GMT+11:00) Lord Howe Time" },
  {
    value: "(GMT+11:00) Magadan Standard Time",
    label: "(GMT+11:00) Magadan Standard Time",
  },
  {
    value: "(GMT+11:00) New Caledonia Standard Time",
    label: "(GMT+11:00) New Caledonia Standard Time",
  },
  { value: "(GMT+11:00) Ponape Time", label: "(GMT+11:00) Ponape Time" },
  {
    value: "(GMT+11:00) Sakhalin Standard Time",
    label: "(GMT+11:00) Sakhalin Standard Time",
  },
  {
    value: "(GMT+11:00) Solomon Islands Time",
    label: "(GMT+11:00) Solomon Islands Time",
  },
  {
    value: "(GMT+11:00) Srednekolymsk Time",
    label: "(GMT+11:00) Srednekolymsk Time",
  },
  {
    value: "(GMT+11:00) Vanuatu Standard Time",
    label: "(GMT+11:00) Vanuatu Standard Time",
  },
  {
    value: "(GMT+12:00) Anadyr Standard Time",
    label: "(GMT+12:00) Anadyr Standard Time",
  },
  {
    value: "(GMT+12:00) Fiji Standard Time",
    label: "(GMT+12:00) Fiji Standard Time",
  },
  {
    value: "(GMT+12:00) Gilbert Islands Time",
    label: "(GMT+12:00) Gilbert Islands Time",
  },
  {
    value: "(GMT+12:00) Marshall Islands Time - Kwajalein",
    label: "(GMT+12:00) Marshall Islands Time - Kwajalein",
  },
  {
    value: "(GMT+12:00) Marshall Islands Time - Majuro",
    label: "(GMT+12:00) Marshall Islands Time - Majuro",
  },
  { value: "(GMT+12:00) Nauru Time", label: "(GMT+12:00) Nauru Time" },
  {
    value: "(GMT+12:00) Norfolk Island Time",
    label: "(GMT+12:00) Norfolk Island Time",
  },
  {
    value: "(GMT+12:00) Petropavlovsk-Kamchatski Standard Time",
    label: "(GMT+12:00) Petropavlovsk-Kamchatski Standard Time",
  },
  { value: "(GMT+12:00) Tuvalu Time", label: "(GMT+12:00) Tuvalu Time" },
  {
    value: "(GMT+12:00) Wake Island Time",
    label: "(GMT+12:00) Wake Island Time",
  },
  {
    value: "(GMT+12:00) Wallis & Futuna Time",
    label: "(GMT+12:00) Wallis & Futuna Time",
  },
  {
    value: "(GMT+13:00) Apia Standard Time",
    label: "(GMT+13:00) Apia Standard Time",
  },
  {
    value: "(GMT+13:00) New Zealand Time",
    label: "(GMT+13:00) New Zealand Time",
  },
  {
    value: "(GMT+13:00) Phoenix Islands Time",
    label: "(GMT+13:00) Phoenix Islands Time",
  },
  { value: "(GMT+13:00) Tokelau Time", label: "(GMT+13:00) Tokelau Time" },
  {
    value: "(GMT+13:00) Tonga Standard Time",
    label: "(GMT+13:00) Tonga Standard Time",
  },
  { value: "(GMT+13:45) Chatham Time", label: "(GMT+13:45) Chatham Time" },
  {
    value: "(GMT+14:00) Line Islands Time",
    label: "(GMT+14:00) Line Islands Time",
  },
];

export default TIMEZONE_LIST;
