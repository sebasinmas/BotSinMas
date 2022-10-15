import CamperModel, { CamperInt } from "../database/models/CamperModel"

export const getCamperData = async (id: string): Promise<CamperInt> => {
    const camperData = (await CamperModel.findOne({ discordID: id })) ||
        (await CamperModel.create({
            discordId: id,
            round: 1,
            day: 1,
            timestamp: Date.now()
        }));
        return camperData;
}