class DataStorage {
    constructor() {
        this.storageKey = 'abtechGameData';
    }

    // Profil utilisateur
    saveProfile(profile) {
        const data = this.getData();
        data.profile = profile;
        this.setData(data);
    }

    getProfile() {
        const data = this.getData();
        return data.profile || null;
    }

    // Statistiques de jeu
    saveGameStats(gameName, stats) {
        const data = this.getData();
        if (!data.stats) data.stats = {};
        data.stats[gameName] = stats;
        this.setData(data);
    }

    getGameStats(gameName) {
        const data = this.getData();
        if (!data.stats || !data.stats[gameName]) {
            return {
                played: 0,
                correct: 0,
                incorrect: 0,
                totalScore: 0
            };
        }
        return data.stats[gameName];
    }

    // Paramètres
    saveSettings(settings) {
        const data = this.getData();
        data.settings = settings;
        this.setData(data);
    }

    getSettings() {
        const data = this.getData();
        return data.settings || {
            soundEnabled: true,
            voiceEnabled: true,
            difficulty: 'easy'
        };
    }

    // Données générales
    getData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Erreur lors de la lecture des données:', error);
            return {};
        }
    }

    setData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
        }
    }

    clearAll() {
        localStorage.removeItem(this.storageKey);
    }
}

const storage = new DataStorage();