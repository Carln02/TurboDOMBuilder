import {SongData} from "./song/song.types";

export class DataHandler {
    private static songsPath = "./data/songs.json";
    private static songsData: SongData[];

    private static async fetchData(url: string): Promise<any> {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }

    public static async getSongs(): Promise<SongData[]> {
        if (!this.songsData) this.songsData = await this.fetchData(this.songsPath);
        return this.songsData;
    }

    public static async getSong(id: string): Promise<SongData> {
        return (await this.getSongs()).find(entry => entry.id === id);
    }
}