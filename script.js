
const heroNames = `
Aamon|Assassin
Akai|Tank
Aldous|Fighter
Alice|Mage, Tank
Alpha|Fighter
Alucard|Fighter, Assassin
Angela|Support
Argus|Fighter
Arlott|Fighter, Assassin
Atlas|Tank
Aulus|Fighter
Aurora|Mage
Badang|Fighter
Balmond|Fighter
Bane|Fighter, Mage
Barats|Tank, Fighter
Baxia|Tank
Beatrix|Marksman
Belerick|Tank
Benedetta|Assassin, Fighter
Brody|Marksman
Bruno|Marksman
Carmilla|Support, Tank
Cecilion|Mage
Chang'e|Mage
Chip|Support, Tank
Chou|Fighter
Cici|Fighter
Claude|Marksman
Clint|Marksman
Cyclops|Mage
Diggie|Support
Dyrroth|Fighter
Edith|Tank, Marksman
Esmeralda|Tank, Mage
Estes|Support
Eudora|Mage
Fanny|Assassin
Faramis|Support, Mage
Floryn|Support
Franco|Tank
Fredrinn|Fighter, Tank
Freya|Fighter
Gatotkaca|Tank, Fighter
Gloo|Tank
Gord|Mage
Granger|Marksman
Grock|Tank, Fighter
Guinevere|Fighter
Gusion|Assassin
Hanabi|Marksman
Hanzo|Assassin
Harith|Mage
Harley|Assassin, Mage
Hayabusa|Assassin
Helcurt|Assassin
Hilda|Fighter, Tank
Hirara|Assassin
Hylos|Tank
Irithel|Marksman
Ixia|Marksman
Jawhead|Fighter
Johnson|Tank, Support
Joy|Assassin
Julian|Fighter, Assassin
Kadita|Mage, Assassin
Kagura|Mage
Kaja|Support, Fighter
Kalea|Support, Fighter
Karina|Assassin
Karrie|Marksman
Khaleed|Fighter
Khufra|Tank
Kimmy|Marksman, Mage
Lancelot|Assassin
Lapu-Lapu|Fighter
Layla|Marksman
Leomord|Fighter
Lesley|Marksman, Assassin
Ling|Assassin
Lolita|Support, Tank
Lukas|Fighter
Lunox|Mage
Luo Yi|Mage
Lylia|Mage
Marcel|Support
Martis|Fighter
Masha|Fighter, Tank
Mathilda|Support, Assassin
Melissa|Marksman
Minotaur|Tank, Support
Minsitthar|Fighter
Miya|Marksman
Moskov|Marksman
Nana|Mage
Natalia|Assassin
Natan|Marksman
Nolan|Assassin
Novaria|Mage
Obsidia|Marksman
Odette|Mage
Paquito|Fighter, Assassin
Pharsa|Mage
Phoveus|Fighter
Popol and Kupa|Marksman
Rafaela|Support
Roger|Fighter, Marksman
Ruby|Fighter
Saber|Assassin
Selena|Assassin, Mage
Silvanna|Fighter
Sora|Fighter, Assassin
Sun|Fighter
Suyou|Assassin, Fighter
Terizla|Fighter, Tank
Thamuz|Fighter
Tigreal|Tank
Uranus|Tank
Vale|Mage
Valentina|Mage
Valir|Mage
Vexana|Mage
Wanwan|Marksman
X.Borg|Fighter
Xavier|Mage
Yi Sun-shin|Assassin, Marksman
Yin|Fighter, Assassin
Yu Zhong|Fighter
Yve|Mage
Zetian|Mage
Zhask|Mage
Zhuxin|Mage
Zilong|Fighter, Assassin
`;

const heroes = heroNames.trim().split("\n").map(line => {
    const [name, roles] = line.split("|");
    return {
        name: name.trim(),
        roles: roles.split(",").map(role => role.trim())
    };
});

const heroGrid = document.getElementById("heroGrid");
const heroSearch = document.getElementById("heroSearch");
const roleFilter = document.getElementById("roleFilter");
const heroCount = document.getElementById("heroCount");
const noHeroes = document.getElementById("noHeroes");

function getHeroImage(name) {
    return `images/heroes/${name.toLowerCase().replaceAll(" ", "-").replaceAll(".", "")}.png`;
}

function displayHeroes() {
    const search = heroSearch.value.toLowerCase().trim();
    const role = roleFilter.value;

    const filtered = heroes.filter(hero => {
        const matchesName = hero.name.toLowerCase().includes(search);
        const matchesRole =
            role === "All" || hero.roles.includes(role);

        return matchesName && matchesRole;
    });

    heroGrid.replaceChildren();

    filtered.forEach(hero => {
        const card = document.createElement("article");
        card.className = "hero-card";
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `View ${hero.name} details`);

        const image = document.createElement("img");
        image.src = getHeroImage(hero.name);
        image.alt = hero.name;
        image.loading = "lazy";

        const placeholder = document.createElement("div");
        placeholder.className = "hero-placeholder";
        placeholder.textContent = hero.name.charAt(0);

        image.addEventListener("error", () => {
            image.replaceWith(placeholder);
        });

        const title = document.createElement("h3");
        title.textContent = hero.name;

        const roleText = document.createElement("p");
        roleText.textContent = hero.roles.join(" / ");

        card.append(image, title, roleText);

        card.addEventListener("click", () => {
            openHeroDetails(hero);
        });

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openHeroDetails(hero);
            }
        });

        heroGrid.appendChild(card);
    });

    heroCount.textContent = filtered.length;
    noHeroes.classList.toggle("hidden", filtered.length > 0);
}

function openHeroDetails(hero) {
    const details = heroDetails[hero.name];

    document.getElementById("detailName").textContent = hero.name;
    document.getElementById("detailRole").textContent =
        `Role: ${hero.roles.join(" / ")}`;

    const portrait = document.getElementById("detailPortrait");
    portrait.src = details?.portrait || getHeroImage(hero.name);
    portrait.alt = hero.name;

    portrait.onerror = () => {
        portrait.removeAttribute("src");
        portrait.alt = `${hero.name} portrait not available`;
    };

    document.getElementById("detailLane").textContent =
        `Lane: ${details?.lane || "Information pending"}`;

    document.getElementById("detailSpecialty").textContent =
        `Specialty: ${details?.specialty || "Information pending"}`;

    document.getElementById("detailDifficulty").textContent =
        `Difficulty: ${details?.difficulty || "Information pending"}`;

    document.getElementById("passiveName").textContent =
        details?.passive?.name || "Not yet available";

    document.getElementById("passiveDescription").textContent =
        details?.passive?.description ||
        "Verified passive information is still being added.";

    const skillList = document.getElementById("skillList");
    skillList.replaceChildren();

    if (details?.skills?.length) {
        details.skills.forEach((skill, index) => {
            const entry = document.createElement("div");
            entry.className = "skill-entry";

            const title = document.createElement("h4");
            title.textContent = `Skill ${index + 1}: ${skill.name}`;

            const description = document.createElement("p");
            description.textContent = skill.description;

            entry.append(title, description);
            skillList.appendChild(entry);
        });
    } else {
        skillList.textContent =
            "Verified skill information is still being added.";
    }

    const buildList = document.getElementById("buildList");
    buildList.replaceChildren();

    if (details?.build?.length) {
        details.build.forEach(item => {
            const entry = document.createElement("div");
            entry.className = "build-entry";

            const name = document.createElement("span");
            name.textContent = item;

            entry.appendChild(name);
            buildList.appendChild(entry);
        });
    } else {
        buildList.textContent =
            "Verified recommended build is not yet available.";
    }

    document.getElementById("emblemName").textContent =
        details?.emblem || "Emblem information pending";

    const talentList = document.getElementById("talentList");
    talentList.replaceChildren();

    (details?.talents || []).forEach(talent => {
        const item = document.createElement("li");
        item.textContent = talent;
        talentList.appendChild(item);
    });

    document.getElementById("battleSpell").textContent =
        details?.battleSpell || "Information pending";

    document.getElementById("buildNote").textContent =
        details?.note ||
        "This hero's verified skills and build have not been added yet.";

    document.getElementById("heroModal").classList.remove("hidden");
    document.body.classList.add("modal-open");
}

function closeHeroDetails() {
    document.getElementById("heroModal").classList.add("hidden");
    document.body.classList.remove("modal-open");
}

document.getElementById("closeModal").addEventListener(
    "click",
    closeHeroDetails
);

document.getElementById("heroModal").addEventListener("click", event => {
    if (event.target.id === "heroModal") {
        closeHeroDetails();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeHeroDetails();
    }
});

heroSearch.addEventListener("input", displayHeroes);
roleFilter.addEventListener("change", displayHeroes);

displayHeroes();

console.log("DREIXZONE loaded:", heroes.length, "heroes");
