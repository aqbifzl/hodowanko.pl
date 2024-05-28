import { gameMode } from "../contexts/GameInfoContext"
import { btnType } from "./utilsTypes"

export const allTextColors = [
  "wow-blue","wow-red","wow-white","wow-green","wow-yellow", "wow-purple"
]
export const restoreUrl = "/restore/"
export const secondRewardIntervalMs = 1000
export const updateUserIntervalMs = 600
export const updateTimerIntervalMs = 10
export const respectAnimationDurationMs = 1000
export const wowAnimationDurationMs = 550
export const clickButtonPressIntervalMs = 100
export const localStorageIdName = "id"

export const shopButtons = [
  {
    id: 1,
    name: "Kości na potencje",
    value: 1,
    price: 2,
    amount: 0,
    type: btnType.CLICK 
  },
  {
    id: 2,
    name: "Bat na pieseł",
    value: 8,
    price: 10,
    amount: 0,
    type: btnType.CLICK 
  },
  {
    id: 3,
    name: "Eliksir miłości",
    value: 25,
    price: 350,
    amount: 0,
    type: btnType.CLICK 
  },
  {
    id: 4,
    name: "Krzycz pieseł",
    value: 40,
    price: 500,
    amount: 0,
    type: btnType.CLICK 
  },
  {
    id: 5,
    name: "Spec. ds. rozpłodu",
    value: 400,
    price: 10000,
    amount: 0,
    type: btnType.CLICK 
  },
  {
    id: 6,
    name: "Opiekun pieseł",
    value: 1,
    price: 10,
    amount: 0,
    type: btnType.TIME 
  },
  {
    id: 7,
    name: "Buda dla pieseł",
    value: 4,
    price: 20,
    amount: 0,
    type: btnType.TIME 
  },
  {
    id: 8,
    name: "Dom dla pieseł",
    value: 12,
    price: 500,
    amount: 0,
    type: btnType.TIME 
  },
  {
    id: 9,
    name: "Farma dla pieseł",
    value: 22,
    price: 3000,
    amount: 0,
    type: btnType.TIME 
  },
  {
    id: 10,
    name: "Ulica dla pieseł",
    value: 50,
    price: 10000,
    amount: 0,
    type: btnType.TIME 
  },
  {
    id: 11,
    name: "Wioska dla pieseł",
    value: 185,
    price: 40000,
    amount: 0,
    type: btnType.TIME 
  },
  {
    id: 12,
    name: "Miasto dla pieseł",
    value: 600,
    price: 200000,
    amount: 0,
    type: btnType.TIME 
  },
  {
    id: 13,
    name: "Metropolia dla pieseł",
    value: 1100,
    price: 1500000,
    amount: 0,
    type: btnType.TIME 
  },
  {
    id: 14,
    name: "Wojew. dla pieseł",
    value: 2500,
    price: 50000000,
    amount: 0,
    type: btnType.TIME 
  },
  {
    id: 15,
    name: "Kraj dla pieseł",
    value: 10000,
    price: 500000000,
    amount: 0,
    type: btnType.TIME 
  },
  {
    id: 16,
    name: "Świat dla PIESEŁ",
    value: 450000,
    price: 1000000000,
    amount: 0,
    type: btnType.TIME 
  },
  {
    id: 17,
    name: "K O S M O S P I E S E Ł",
    value: 1000000,
    price: 99999999999,
    amount: 0,
    type: btnType.TIME 
  },
]

export const defaultContextVal = {
  ran: false,
  balance: 0,
  rewardPerClick: 1,
  rewardPerSecond: 0,
  respectQueue: [
  ],
  wowQueue: [
  ],
  mode: gameMode.FOREVER,
  shopItems: [
    ...shopButtons
  ],
  initItems: [
    ...shopButtons
  ],
}
