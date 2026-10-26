/* ROBONEST editable content. Add a course = add one object to COURSES. */
window.ROBONEST = {
  CONFIG: {
    // Paste a form-service/backend URL here to enable online submission (leave "" to use the email fallback).
    FORM_ENDPOINT: "",
    EMAIL: "robonestcenterforinnovation@gmail.com",
    MAP: "https://www.google.com/maps/search/?api=1&query=Haidergarh%2C%20Lucknow%2C%20Uttar%20Pradesh%2C%20India"
  },
  // [icon, name, description, course category]
  AREAS: [
    ["🤖","Robotics and Automation","Design, build and program machines that sense and move.","Robotics"],
    ["🧠","Artificial Intelligence","See how computers learn from data and make decisions.","AI"],
    ["💻","Coding and Programming","Build logical thinking with hands-on programming.","Coding"],
    ["🔌","Arduino and Embedded Systems","Program microcontrollers that control real devices.","Arduino"],
    ["📡","Internet of Things (IoT)","Connect sensors and gadgets into smart systems.","IoT"],
    ["⚡","Electronics and Circuit Design","Learn how components work by wiring real circuits.","Electronics"],
    ["🔬","STEM Education","Explore science and engineering through experiments.","STEM"],
    ["🍓","Raspberry Pi Projects","Use a pocket computer for cameras, servers and gadgets.","Raspberry Pi"],
    ["🚁","Drone Technology","Understand flight, control and drone building basics.","Drones"],
    ["🧊","3D Design and Printing","Model your ideas and turn them into physical parts.","3D Design"],
    ["💡","Creative Problem Solving","Break big problems into steps you can test and improve.","STEM"],
    ["🛠️","Robotics Project Development","Plan, build and present a complete robotics project.","Robotics"]
  ],
  // Fees, duration and schedules are intentionally absent until confirmed.
  COURSES: [
    {id:"beginner-robotics",name:"Beginner Robotics",cat:"Robotics",level:"Beginner",icon:"🤖",featured:1,desc:"Build and drive your first robots while learning how motors, sensors and logic fit together.",topics:["Motors and sensors","Robot design","Line following"]},
    {id:"arduino",name:"Arduino and Embedded Systems",cat:"Arduino",level:"Intermediate",icon:"🔌",featured:1,desc:"Program microcontrollers to read the world around them and control devices.",topics:["Arduino IDE","Sensors and displays","Control logic"]},
    {id:"python",name:"Python Programming",cat:"Coding",level:"Beginner",icon:"🐍",featured:1,desc:"Learn to think in code through small, practical Python programs.",topics:["Variables and loops","Functions","Mini projects"]},
    {id:"ai-fundamentals",name:"Artificial Intelligence Fundamentals",cat:"AI",level:"Intermediate",icon:"🧠",featured:1,desc:"Understand how machines learn and try simple AI ideas hands-on.",topics:["What AI is","Data basics","Simple models"]},
    {id:"iot",name:"IoT and Smart Devices",cat:"IoT",level:"Intermediate",icon:"📡",featured:1,desc:"Connect sensors and devices to build smart, monitored systems.",topics:["Connected sensors","Wi-Fi modules","Monitoring"]},
    {id:"stem-innovation",name:"STEM and Innovation Projects",cat:"STEM",level:"Beginner",icon:"💡",featured:1,desc:"Turn everyday problems into working prototypes through guided experiments.",topics:["Design thinking","Prototyping","Presenting ideas"]},
    {id:"electronics",name:"Electronics and Circuit Design",cat:"Electronics",level:"Beginner",icon:"⚡",desc:"Wire real circuits and learn what each component does.",topics:["Breadboards","Components","Circuit reading"]},
    {id:"raspberry-pi",name:"Raspberry Pi Projects",cat:"Raspberry Pi",level:"Intermediate",icon:"🍓",desc:"Use a small computer to build cameras, controllers and gadgets.",topics:["Setup","Python on Pi","GPIO projects"]},
    {id:"drones",name:"Drone Technology",cat:"Drones",level:"Intermediate",icon:"🚁",desc:"Learn the principles behind flight, control and drone assembly.",topics:["Flight basics","Components","Safe operation"]},
    {id:"3d-design",name:"3D Design and Printing",cat:"3D Design",level:"Beginner",icon:"🧊",desc:"Model your own parts and learn how they become physical objects.",topics:["3D modelling","Printing basics","Project parts"]}
  ]
};
