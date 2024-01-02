import en from "./en.json";
import uk from "./uk.json";

// i18 alternative custom translator
export const translator = (key: string, lang: string = "en") => {
   switch (lang) {
      case "en":
         return en[key as keyof typeof en] as string;
      case "uk":
         return uk[key as keyof typeof uk] as string;
   }
};
