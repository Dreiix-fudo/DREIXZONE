
const heroDetails = {
    "Miya": {
        lane: "Gold Lane",
        specialty: "Reap / Damage",
        difficulty: "Easy",

        portrait: "images/heroes/miya.png",

        passive: {
            name: "Moon Blessing",
            description:
                "Basic attacks increase Miya's attack speed. At maximum stacks, her attacks summon additional Moonlight Arrows."
        },

        skills: [
            {
                name: "Moon Arrow",
                description:
                    "Enhances Miya's basic attacks with additional arrows."
            },
            {
                name: "Arrow of Eclipse",
                description:
                    "Immobilizes enemies in an area."
            },
            {
                name: "Hidden Moonlight",
                description:
                    "Removes debuffs, conceals Miya and increases her movement speed."
            }
        ],

        build: [
            "Swift Boots",
            "Corrosion Scythe",
            "Demon Hunter Sword",
            "Golden Staff",
            "Wind of Nature",
            "Malefic Roar"
        ],

        emblem: "Marksman Emblem",

        talents: [
            "Swift",
            "Weapon Master",
            "Quantum Charge"
        ],

        battleSpell: "Inspire",

        note:
            "Example build only. Verify current patch changes and enemy team composition before using."
    }
};
