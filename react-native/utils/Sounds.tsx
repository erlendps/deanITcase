import { Audio } from "expo-av";

export const playAlarmSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/sound/hmm.mp3")
  );
  await sound.playAsync();
};

export const playWhatsApp = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/sound/win.mp3")
  );
  await sound.playAsync();
};

export const playApplause = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/sound/lose.mp3")
  );
  await sound.playAsync();
};
