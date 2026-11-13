// Source: SupeRR_Selector_R1_Pressure_Report.pdf
// [name, team, rating, stability%, pressureBalls, normal, pressure, wkts/outs, dot% pressure, dot% normal, IPL share%]
const BAT = [
["Tim David","Royal Challengers Bengaluru",2.65,84,325,171.3,195.4,19,30,30,47],
["Abhishek Sharma","Sunrisers Hyderabad",1.65,50,554,193.0,174.4,22,37,32,57],
["Vaibhav Sooryavanshi","Rajasthan Royals",1.62,38,169,213.5,232.5,8,36,34,82],
["Fakhar Zaman","Intl only",1.50,33,189,129.9,143.4,6,35,38,0],
["Phil Salt","Royal Challengers Bengaluru",1.47,47,394,177.8,164.7,17,35,30,43],
["Cameron Green","Kolkata Knight Riders",1.40,51,237,149.7,176.8,9,30,29,57],
["Virat Kohli","Royal Challengers Bengaluru",1.35,39,526,144.8,158.4,14,29,28,89],
["Yashasvi Jaiswal","Rajasthan Royals",1.32,40,478,154.7,159.6,20,39,38,81],
["Heinrich Klaasen","Sunrisers Hyderabad",1.30,51,212,164.9,185.8,9,22,25,83],
["Jos Buttler","Gujarat Titans",1.09,33,458,157.0,164.4,15,33,32,61]];
const BOWL = [
["Kuldeep Yadav","Delhi Capitals",2.04,80,283,8.0,7.2,20,31,33,80],
["Krunal Pandya","Royal Challengers Bengaluru",1.98,65,223,7.9,6.9,17,34,29,100],
["Sunil Narine","Kolkata Knight Riders",1.94,89,277,7.0,6.5,16,38,36,100],
["Lockie Ferguson","Punjab Kings",1.63,52,242,8.7,8.5,20,44,37,65],
["Rashid Khan","Gujarat Titans",1.40,64,402,7.5,7.2,28,34,35,66],
["Axar Patel","Delhi Capitals",1.34,53,462,7.8,8.4,20,34,35,46],
["Josh Hazlewood","Royal Challengers Bengaluru",1.31,60,364,8.3,8.0,26,44,44,72],
["Ravichandran Ashwin","Chennai Super Kings",1.28,39,274,7.6,7.6,15,33,30,93],
["Jasprit Bumrah","Mumbai Indians",1.18,44,402,6.8,7.6,19,43,43,72],
["Kagiso Rabada","Gujarat Titans",1.02,36,400,9.2,8.5,23,46,39,77]];
const BANDS = [["<0.5",33.5],["0.5-1",35.4],["1-1.5",35.3],["1.5-2",36.8],["2-3",38.6],["3+",33.9]];
const FIT = [
["Tim David","Best finisher in the pool; SR 195 vs 171 under pressure. Strongest target for the death-overs gap."],
["Abhishek Sharma","Highest volume (554 pressure balls). Aggressive opener who stays positive on WPA; pairs with Jaiswal."],
["Vaibhav Sooryavanshi","Already at RR. SR 233 under pressure on 169 balls; retain and protect, small sample."],
["Fakhar Zaman","T20I-only evidence. Scouting flag: check IPL availability first."],
["Phil Salt / Klaasen","Salt: reliable opener, high consistency. Klaasen: lowest dot% (21.7%), SR 186, keeper-finisher."],
["Cameron Green","Pressure SR 177 vs 150 normal, plus bowling utility."],
["Kuldeep, Krunal, Narine","Three control spinners, sub-par economy under pressure, 16 to 20 wickets each. Clearest middle-over upgrade."],
["Ferguson / Rashid","Ferguson: 20 wickets on 242 balls at econ 8.5. Rashid: 28 wickets on 402 balls, most prolific."]];
