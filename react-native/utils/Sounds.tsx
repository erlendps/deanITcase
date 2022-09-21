import { Audio } from "expo-av";

export const playAlarmSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/sound/alarm.mp3")
  );
  await sound.playAsync();
};

export const playWhatsApp = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/sound/moments.mp3")
  );
  await sound.playAsync();
};

export const playApplause = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/sound/applause.mp3")
  );
  await sound.playAsync();
};
