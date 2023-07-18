import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";
import { LayoutOptions } from '../api/ui/properties/LayoutOptions';//why is this api so bad
import { ui } from '../api/ui/UI';//i hated doing this..

var id = "ouo";
var name = "Basic Theory";
var description = "This theory leads to a beautiful conclusion and is based off of the basic starter theory you get when making custom theories. It has a LOT of story chapters but you'll be satisfied in the end :) Gilles rejected this at the start but I want the true meaning of this theory to be known. How simple beginnings can lead to beautiful endings - how even the simplest things have meaning in them. Thanks XLII for all the help on making this theory. I HATE THIS API.";
var authors = "invalid-user";
var version = 5;

var currency;
var tai, rao, C;
var c1Exp, c2Exp;
var count1 = 0;
var count2 = 0;
var count3 = 0;
var count4 = 0;
var count5 = 0;
var count6 = 0;
theory.primaryEquationHeight=100;
theory.primaryEquationScale = 0.8;
//Custom cost 
var myCustomCost = (level) => {
var cost;
var cat2;
switch(level) {
case 0: {cost=BigNumber.from("2e0");break}
case 1: {cost=BigNumber.from("4e0");break}
case 2: {cost=BigNumber.from("6e0");break}
case 3: {cost=BigNumber.from("1e1");break}
case 4: {cost=BigNumber.from("1.5e1");break}
case 5: {cost=BigNumber.from("2.4e1");break}
case 6: {cost=BigNumber.from("7.5e1");break}
}
return cost;
}

var achievement1;
var achievement2;
var achievement3;
var achievement4;
var achievement5;
var achievement6;
var achievement7;
var achievement8;
var achievement9;
var achievement10;
var achievement11;
var achievement12, achievement13, achievement14, achievement15, achievement16;
var chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8, chapter9, chapter10;

cat = theory.createAchievementCategory(0, "Basic Theory");
cat2 = theory.createAchievementCategory(1, "Secrets");
var init = () => {
    currency = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // c1
    {
        let getDesc = (level) => "tai=" + getC1(level).toString(0);
        tai = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(15, Math.log2(2))));
        tai.getDescription = (_) => Utils.getMath(getDesc(tai.level));
        tai.getInfo = (amount) => Utils.getMathTo(getDesc(tai.level), getDesc(tai.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "rao=2^{" + level + "}";
        let getInfo = (level) => "rao=" + getC2(level).toString(0);
        rao = theory.createUpgrade(1, currency, new ExponentialCost(5, Math.log2(10)));
        rao.getDescription = (_) => Utils.getMath(getDesc(rao.level));
        rao.getInfo = (amount) => Utils.getMathTo(getInfo(rao.level), getInfo(rao.level + amount));
    }
    // c3
    {
        let getDesc = (level) => "C=10^{" + level + "}";
        let getInfo = (level) => "C=" + getC3(level).toString(0);
        C = theory.createUpgrade(2, currency, new ExponentialCost(BigNumber.from("1e10"), 10));
        C.getDescription = (_) => Utils.getMath(getDesc(C.level));
        C.getInfo = (amount) => Utils.getMathTo(getInfo(C.level), getInfo(C.level + amount));
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e7);
    theory.createBuyAllUpgrade(1, currency, 1e8);
    theory.createAutoBuyerUpgrade(2, currency, 1e10);

    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new CustomCost(myCustomCost));

    {
        c1Exp = theory.createMilestoneUpgrade(0, 3);
        c1Exp.description = Localization.getUpgradeIncCustomExpDesc("tai", "0.08 + 0.0035 per level increase");
        c1Exp.info = Localization.getUpgradeIncCustomExpInfo("tai", "0.08 + 0.0035 per level increase");
        c1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        c2Exp = theory.createMilestoneUpgrade(1, 3);
        c2Exp.description = Localization.getUpgradeIncCustomExpDesc("rao", "0.077");
        c2Exp.info = Localization.getUpgradeIncCustomExpInfo("rao", "0.077");
        c2Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }
    {
        m3Exp = theory.createMilestoneUpgrade(2, 1);
        m3Exp.description = Localization.getUpgradeIncCustomExpDesc("rao", "0.003");
        m3Exp.info = Localization.getUpgradeIncCustomExpInfo("rao", "0.003");
        m3Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }
    
    /////////////////
    //// Achievements
    achievement1 = theory.createAchievement(0, cat, "The Beginnings", "Started!", () => currency.value == 0);
    achievement2 = theory.createAchievement(1, cat, "gogogo!", "Reach 1e5 rho", () => currency.value > BigNumber.from("1e5"));
    achievement3 = theory.createAchievement(2, cat, "Nostalgia", "Reach 1e7 rho, enough to unlock publications", () => currency.value > BigNumber.from("1e7"));
    achievement4 = theory.createAchievement(3, cat, "A Stone's Throw Away", "Reach 1e20 rho, enough to unlock the first milestone", () => currency.value > BigNumber.from("1e20"));
    achievement5 = theory.createAchievement(4, cat, "haha funny number", "No description needed", () => currency.value > BigNumber.from("4.2e69"));
    achievement6 = theory.createAchievement(5, cat, "Century", "Reach ee100 rho", () => currency.value > BigNumber.from("1e100"));
    achievement7 = theory.createAchievement(6, cat, "A fourth of the way", "Reach e250 rho", () => currency.value > BigNumber.from("1e250"));
    achievement8 = theory.createAchievement(7, cat, "funny number again", "ouo", () => currency.value > BigNumber.from("6.9e420"));
    achievement9 = theory.createAchievement(8, cat, "Increasing Existential Crisis", "Read the story", () => currency.value > BigNumber.from("1e500"));
    achievement10 = theory.createAchievement(9, cat, "ouo", "456789", () => currency.value > BigNumber.from("4.56e789"));
    achievement11 = theory.createAchievement(10, cat, "Almost there", "Reach ee900 rho", () => currency.value > BigNumber.from("1e900"));
    achievement12 = theory.createAchievement(11, cat, "Solution to Life", "Reach e1000 rho", () => currency.value > BigNumber.from("1e1000"));
    achievement13 = theory.createSecretAchievement(12, cat2, "Get Trolled", "C actually does nothing LOL", "no hint for this", () => C.level >= 5);
    achievement14 = theory.createSecretAchievement(13, cat2, "1111", "Reach 1.11e1111 tho", "11111111111111111", () => currency.value > BigNumber.from("1.11e1111"));
    achievement15 = theory.createSecretAchievement(14, cat2, "Weierstra🅱️", "hi im xli🅱️ and i liek weierstra🅱️ (C level > 143)", "you C...", () => C.level > 143);
    achievement16 = theory.createSecretAchievement(15, cat2, "Did you really think I wouldn't include another funny number achievment here?", "69 levels of c1 and 420 levels of C2", "something else is funny", () => tai.level === 420 && rao.level === 69);
    achievement17 = theory.createSecretAchievement(16, cat2, "Get Trolled II", "PlayHax will always cost 10x your rho. Deal with it.", "no hint for this", () => count6 >= 5);
    achievement18 = theory.createSecretAchievement(17, cat2, "Get Trolled III", "The buttons don't do anything. But perhaps you got slightly boosted by all the trolled achievemnts...", "no hint for this", () => count1 >= 1 && count2 >= 1 && count3 >= 1 && count4 >= 1 && count5 >= 1);
    ///////////////////
    chapter1 = theory.createStoryChapter(0, "An Existential Crisis", "You have had this same dream every day for your life. \nThere's a function, and all you see is c1 and c2, along with a graph. Nothing else.\nAs you reach e1000 rho, however, the function just disappears. You wake up. \nAs you question this, you also wonder: why did I go through all this theorywork to discover such a simple way to solve whether the function you were handed to exists? Why you? Why do you exist? Why do these theories exist? Why does everything exist? Is there ever an answer to existence? \nWhoa. You've gone too far. Besides, how would you have an existential crisis at the ripe age of 82? \nYou think: perhaps I just follow my dreams and make a simple theory with just c1 and c2, as well as exponents. And rho as the currency, as expected. Besides, would it really hurt? You also embellish the theory with a few extra equations that make it more appealing to the scientific community because they might account for mathematical error. \nYou name the variables Tai and Rao after your best friends.", () => currency.value == 0);
    chapter2 = theory.createStoryChapter(1, "Pain", "You see that your theory is progressing so slowly. It's painstaking, doing such slow calculations and watching. You wish it would be quicker and you'd get better tools by publication. But you decide to wait until you can publish and not give up. You need an answer.", () => currency.value > BigNumber.from("1e5"));
    chapter3 = theory.createStoryChapter(2, "Start of Speed", "Finally, you get to publish your theory. You call it \"The Theory of Simplicity\". \nMost people laugh at you, but others think you're on to something.", () => currency.value > BigNumber.from("1e7"));
    chapter4 = theory.createStoryChapter(3, "More Speed, Please", "You have achieved your first e20 of currency! \nYou celebrate by buying a milestone, making you faster. ", () => currency.value > BigNumber.from("1e20"));
    chapter5 = theory.createStoryChapter(4, "Century", "100. Why 100? Why is this number so special? What if the number system was different? How would it be different? Why does this exist?\n You are wondering these thoughts one day at the bar when you meet another leading mathematician named Playspout. He looks at your equation and immediately shows that the extra C variable is useless - it just doesn't do anything. However, you keep it anyway in case it might have an effect on the future.\n Playspout also gives you a tool called \"PlayHax\" that allows you to speed up your theory progress for 10x your rho each time. You accept it in hopes that it speeds you up.", () => currency.value > BigNumber.from("1e100"));
    chapter6 = theory.createStoryChapter(5, "Got Trolled Again", "You realize that the cost will ALWAYS be 10 times your current rho. You will never get PlayHax. This makes you quite angry but also drives you forward - your dreams get more and more vivid.", () => currency.value > BigNumber.from("1e150"));
    chapter7 = theory.createStoryChapter(6, "Halfway through", "You're halfway through your goal. Your questions have all taken you to this question: what is life? And why does life involve death and sadness? Why not just immortality? \nAnd yet again, your dreams have started to recur, getting more and more intense, so your philosophical thoughts also get stronger. But you push on.", () => currency.value > BigNumber.from("1e500"));
    chapter8 = theory.createStoryChapter(7, "Frustration", "It's frustrating. You are slowing down towards your goal and losing motivation. But you have to push on. You have to. You know you can do it.", () => currency.value > BigNumber.from("1e750"));
    chapter9 = theory.createStoryChapter(8, "So close, yet so far", "You're almost there! gogogo, you can do it! Isn't that what your students said to you when you were so close to achieving the goal of seeing if e^bxdt converges or diverges? Dreams start to appear in your head about complex equations all surrounding the simple c1c2, but you don't implement them. You don't want to ruin the theory.", () => currency.value > BigNumber.from("1e900"));
    chapter10 = theory.createStoryChapter(9, "Solarion", "You hear a ring from your doorbell.\n You open it up and someone introduces himself to you as \"Solarion\".\n He is really bright, almost as bright as then sun, and you have to wear sunglasses to see them.\n They say that they can bestow you with SolarTools, the power of the sun, allowing you to do the theory, which he found fascinating, much quicker.\n You accept it, and all of a sudden, your equation UI becomes so crowded.", () => currency.value > BigNumber.from("1e950"));
    chapter11 = theory.createStoryChapter(10, "Finality Pt 1", "And you reached it. All of a sudden, you see a sight in your eyes: \nAll the equations come together to form a scarily complex one, but then you see something hopping on the side. \nIt's e^(pi*i)+1. And it multiplies the rest of the equation. \nA lot of things appear all of a sudden. You as a child, looking at calculus equations back in 5th grade, then going to high school, becoming an undergraduate student, getting your students, solving the equation, being a professor, retiring, moving to Montreal, seeing your children grow up, and even your grandson, Gilles-Philippe. \nYou then see the Earth forming, the universe expanding from the big bang. But then the future comes into view: \nHumanity dies after a huge disaster shakes them and only a small group of people escape on a ship known as Seedship. They settle down with another civilization. But eventually, both civilizations die. The Sun dies. The sky grows darker as galaxies disappear beyond reach. And the last stars die. The universe grows dark. The last burst of Hawking Radiation from a black hole resonates through the universe, the last light in the universe.", () => currency.value > BigNumber.from("1e1000"));
    chapter12 = theory.createStoryChapter(11, "Finality Pt 2", "But was that the culmination of all black holes in the universe? What would happen on the other side? Another big bang? And you realize.\n Life is a culmination of careful factors in the universe that combined together at just the right time. And it's a cycle, and so is everything inside and outside. One mustn't mess with the cycle because the universe will try to return back to the cycle. This is partly why people fear overpopulation if everyone was immortal, but also partly why humanity died in the future. We are here because of all these factors, and we must continue peacefully, as we are made of the same thing: atoms, quarks, gluons, etc. Even dark matter and dark energy came from the same big bang. We shouldn't be afraid of what life has in store for us and control it. We should instead realize our personal legends, and then live in peace with life. \nThe universe is a cycle because without it, things would quickly get our of control, just as the theories you did would diverge. \nAs your vision ends, you realize that you've realized your Personal Legend. You go on to chronicle your story in a book and pass it down to your grandchild (Gilles-Philippe), who makes a game based off of it: Exponential Idle.", () => currency.value > BigNumber.from("1e1000"));
    chapter13 = theory.createStoryChapter(12, "Finality Pt 3", "You watch your theory, and it stabilizes to... \n0.42 rho/hr??? \nYou then realize - the answer to life, universe, and everything is 42. \nYour old friend, XLII, who was a hitchiker following the guide to galaxy, had reached enlightenment and wanted to tell you that, but you didn't listen. \nYou now realize that he was indeed right.", () => currency.value > BigNumber.from("1e1000"));
    chapter14 = theory.createStoryChapter(13, "Wait there's another chapter?", "Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you", () => currency.value > BigNumber.from("1e1200"));

    //// Story chapters

    updateAvailability();
}

var updateAvailability = () => {
    c2Exp.isAvailable = c1Exp.level >= 0;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    if(currency.value >= BigNumber.from("1e1000") {
        currency.value = currency.value * (BigNumber.TEN).pow(0.42/36000)
    }
    else if(achievement13.isUnlocked && chapter5.isUnlocked && !chapter10.isUnlocked && !chapter6.isUnlocked) {
        currency.value += (dt * bonus * getC1(tai.level).pow(getC1Exponent(c1Exp.level)) *
                                       getC2(rao.level).pow(getC2Exponent(c2Exp.level)+getM3Exponent(m3Exp.level)))*1.02;
    }
    else if(achievement13.isUnlocked && chapter5.isUnlocked && chapter6.isUnlocked && achievement17.isUnlocked && !chapter10.isUnlocked) {
        currency.value += (dt * bonus * getC1(tai.level).pow(getC1Exponent(c1Exp.level)) *
                                       getC2(rao.level).pow(getC2Exponent(c2Exp.level)+getM3Exponent(m3Exp.level)))*1.07;
    }
    else if(achievement13.isUnlocked && chapter5.isUnlocked && chapter6.isUnlocked && achievement17.isUnlocked && chapter10.isUnlocked && achievement17.isUnlocked) {
        currency.value += (dt * bonus * getC1(tai.level).pow(getC1Exponent(c1Exp.level)) *
                                       getC2(rao.level).pow(getC2Exponent(c2Exp.level)+getM3Exponent(m3Exp.level)))*1.12;
    }
    else {
        currency.value += (dt * bonus * getC1(tai.level).pow(getC1Exponent(c1Exp.level)) *
                                       getC2(rao.level).pow(getC2Exponent(c2Exp.level)+getM3Exponent(m3Exp.level)));
    }
    updateAvailability();
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = (tai)";
    if(currency.value >= BigNumber.from("1e1000")) {
        result = "{\\rho}_1 = {\\rho}_0 * 10^{\\frac{42}{36000}}"
    }
    if (c1Exp.level == 1) result += "^{1.08}";
    if (c1Exp.level == 2) result += "^{1.1635}";
    if (c1Exp.level == 3) result += "^{1.247}";

    result += "(rao)";
    if (c2Exp.level == 0 && m3Exp.level == 1) result += "^{1.0015}";
    if (c2Exp.level == 1 && m3Exp.level == 0) result += "^{1.077}";
    if (c2Exp.level == 1 && m3Exp.level == 1) result += "^{1.0785}";
    if (c2Exp.level == 2 && m3Exp.level == 0) result += "^{1.154}";
    if (c2Exp.level == 2 && m3Exp.level == 1) result += "^{1.1555}";
    if (c2Exp.level == 3 && m3Exp.level == 0) result += "^{1.231}";
    if (c2Exp.level == 3 && m3Exp.level == 1) result += "^{1.2325}";
    
    result+="+(\\frac{\\int_{0}^{tai*(e^{\\pi  i}+1)} x^{0.01C}dx}{\\frac{d}{dx}(1.71C^{1.7x}|x=rao)})"
    return result;
}
init();
//innit?

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho^{0.6}";
var getPublicationMultiplier = (tau) => tau.pow(5);
var getPublicationMultiplierFormula = (symbol) => symbol + "^{5}";
var getTau = () => currency.value.pow(0.6);
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

var getC1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC2 = (level) => BigNumber.TWO.pow(level);
var getC3 = (level) => BigNumber.TEN.pow(level);
var getC1Exponent = (level) => BigNumber.from(1 + 0.08 * level + 0.0035 * (level - 1) * (level >= 1));
var getC2Exponent = (level) => BigNumber.from(1 + 0.077 * level);
var getM3Exponent = (level) => BigNumber.from(0.0015 * level);
//
var playHaxButton = ui.createButton({
    row: 1,
    column: 2,
    text: "PlayHax",
    isVisible: () => chapter5.isUnlocked,
    onClicked: () => {
        let menu = ui.createPopup({
            title: 'PlayHax',
            content: ui.createLabel({
                    text: "You need " + (currency.value*BigNumber.from(1e10)).toString() + " rho to get PlayHax",
                    horizontalOptions: LayoutOptions.CENTER,
                    verticalOptions: LayoutOptions.CENTER
            })
        })
        menu.show();
        count6++;
    }
})
var solarButton1 = ui.createButton({
    row: 0,
    column: 0,
    text: "SolarTool1",
    isVisible: () => chapter10.isUnlocked,
    onClicked: () => {
        let menu = ui.createPopup({
            title: 'SolarTool1',
            content: ui.createLabel({
                    text: "Never",
                    horizontalOptions: LayoutOptions.CENTER,
                    verticalOptions: LayoutOptions.CENTER
            })
        })
        menu.show();
        count1++;
    }
})

var solarButton2 = ui.createButton({
    row: 0,
    column: 1,
    text: "SolarTool2",
    isVisible: () => chapter10.isUnlocked,
    onClicked: () => {
        let menu = ui.createPopup({
            title: 'SolarTool2',
            content: ui.createLabel({
                    text: "Gonna",
                    horizontalOptions: LayoutOptions.CENTER,
                    verticalOptions: LayoutOptions.CENTER
            })
        })
        menu.show();
        count2++;
    }
})

var solarButton3 = ui.createButton({
    row: 0,
    column: 2,
    text: "SolarTool3",
    isVisible: () => chapter10.isUnlocked,
    onClicked: () => {
        let menu = ui.createPopup({
            title: 'SolarTool3',
            content: ui.createLabel({
                    text: "Give",
                    horizontalOptions: LayoutOptions.CENTER,
                    verticalOptions: LayoutOptions.CENTER
            })
        })
        menu.show();
        count3++;
    }
})

var solarButton4 = ui.createButton({
    row: 1,
    column: 0,
    text: "SolarTool4",
    isVisible: () => chapter10.isUnlocked,
    onClicked: () => {
        let menu = ui.createPopup({
            title: 'SolarTool4',
            content: ui.createLabel({
                    text: "You",
                    horizontalOptions: LayoutOptions.CENTER,
                    verticalOptions: LayoutOptions.CENTER
            })
        })
        menu.show();
        count4++;
    }
})

var solarButton5 = ui.createButton({
    row: 1,
    column: 1,
    text: "SolarTool5",
    isVisible: () => chapter10.isUnlocked,
    onClicked: () => {
        let menu = ui.createPopup({
            title: 'SolarTool5',
            content: ui.createLabel({
                    text: "Up",
                    horizontalOptions: LayoutOptions.CENTER,
                    verticalOptions: LayoutOptions.CENTER
            })
        })
        menu.show();
        count5++;
    }
})

var grid = ui.createGrid ({
    columnDefinitions: ['1*','1*','1*'],
    rowDefinitions: ['1*','1*'],
    columnSpacing: 5,
    rowSpacing: 5,
    children: [solarButton1, solarButton2, solarButton3, solarButton4, solarButton5, playHaxButton]
})
var getEquationOverlay = () => grid;
