import { load } from "cheerio"
import { axiosAdminInstance, axiosModifierInstance } from "./axiosAdminInstance.js"
import { axiosInstance } from "./axiosInstance.js"



const getSongId = async () => {
    let songId
    const pageHtml = await axiosInstance.get("sing/create").then(response => response.data)
    const $ = load(pageHtml)

     
    console.log($('body'))
    $('body').find('script').each(  (_, scriptTag) => {
        const scriptBody = $(scriptTag).text()
        if (!scriptBody || !scriptBody.includes("window.currentId = '")) return
        songId = scriptBody.split("window.currentId = '")[1]?.replace("';\n", "")
    } )

    console.log(songId)
    return songId

}

const getResponseInstance = async ({
    songId, title, text, language = "Французский", singers = ["/api/singers/37987"], extendedTitle = "Do or Die"
}) => {
    const response = await axiosAdminInstance.get(`sings/${songId}.json`).then(response => response.data)
    
    delete response.author

    response.title = title
    response.text = text
    response.singers = singers
    response.language = language
    response.isPublish = true
    
    response.extendedTitle = extendedTitle

    return response
}

const start = async () => {
    try {
        const songId = await getSongId()
        const responseInstance = await getResponseInstance({songId, title: "Anthem", text: "[Strofa 1: Coez]\r\nE chi pensava a una rinuncia\r\nCasse rotte suona ancora forte sul boom cha\r\nCalo con la posse con l'impianto che brucia\r\nCol flow come company pompami porta fiducia\r\nSe lucci muove leve fra le nuove leve\r\nKamikaze sul palco Fahrenheit 9/11\r\nE in questa scena di iene\r\nSaprai che se vieni a sti live te ne vai preso bene\r\nIo cash non ne ho, i buffi alla SIAE mica al Borderò\r\nE se tu te ne vai io qui porterò il golden flow\r\nBrokenspeakers on the road è rock n roll\r\n[Ritornello: Strength Approach]\r\nBrokenspeakers do or die\r\nBrokenspeakers do or die\r\nBrokenspeakers do or die\r\nBrokenspeakers do or die\r\n\r\n[Strofa 2: Hube]\r\nOh non me ne vado no\r\nComincia lo show qua è snowboard\r\nTu mo copriti che arriva il flow\r\nÈ un mostro qui la mia nazione\r\nSiamo mostri in azione io ti mostro la combinazione\r\nÈ brokenspeakers con la fender il crew non si arrende\r\nFino a quando tu non schiodi le tende\r\nE vaffanculo a chi si offende io con le spalle al muro\r\nCombatto il lato oscuro da sempre\r\nE dimmi mo' chi è il perdente sto suono ti stende\r\nTi spacca le casse e si sente\r\nNiente è per niente io cavalco la mia onda\r\nPorta il fuoco sulla sponda faccio luce nella notte fonda\r\n\r\n[Strofa 3: Franz]\r\nCasse rotte in esclusiva suona merda recidiva\r\nAvanzo un passo dopo l'altro dentro l'offensiva\r\nCarico l'artiglieria casse rotte fanteria\r\nResti nella scia affanculo dalla zona mia\r\nKeep it real con i pugni e le corna in alto\r\nTesta di cuoio nell'impianto calca l'asfalto\r\nAl completo formazione a pentagono sul palco\r\nQuando salgo famo quadrato-compatto d'assalto\r\n78 ford roba le bombe dai tempi di fain roma blend e unabomber\r\n2 anni fermo ricomincio e voi sparite\r\nBarrica le uscite a casa non tornate grida brokenspeakers\r\nYou might also like\r\nCammina Con Me\r\nBrokenspeakers\r\nSqualo Bianco\r\nBrokenspeakers\r\nBoy’s a liar Pt. 2\r\nPinkPantheress & Ice Spice\r\n[Ritornello: Strength Approach]\r\nBrokenspeakers do or die\r\nBrokenspeakers do or die\r\nBrokenspeakers do or die\r\nBrokenspeakers do or die\r\n\r\n[Strofa 4: Lucci]\r\nEhi L come lascia sta c'ho la U come unabomber\r\nFaccio saltare in aria sta città\r\nC'ho la C come il calore che la gente ce da\r\nE un'altra C come il carisma che ce vole pe spaccà\r\nBrokenspeakers lo sa c'ha la I de intelligenza\r\nPerché qua se sa no nun incazzo senza\r\nE mo pe stacce appresso resti senza benza\r\nArrivati naaaaa, non stamo manco alla partenza\r\nLucci, non me so mai inventato niente\r\nStesso nome su citofono e patente\r\nLo stesso che scolpisco nel cuore della gente\r\nFaccio un'altro disco per rimanere giovane per sempre\r\n\r\n[Strofa 5: Nicco]\r\nE' na scena senza fantasia\r\nQuindi torno con la banda mia\r\nE famo pulizia e se me parli de pazienza io non so che sia\r\nMa se parli de coerenza stamo a casa mia\r\nLa poesia della mia generazione non è morta\r\nStamo qua pe datte le prove quindi ascolta\r\nNun semo arrugginiti ma stamo incattiviti\r\nSenza rancori più valori in mezzo a falsi miti\r\nFra na massa de rincojoniti\r\nAbbassano la testa pe la merda da cui so colpiti\r\nRimani fra chi sogni e trovi rogna qui\r\nBrokenspeakers è back in business come i PMD\r\n[Ritornello: Strength Approach]\r\nBrokenspeakers do or die\r\nBrokenspeakers do or die\r\nBrokenspeakers do or die\r\nBrokenspeakers do or die"})

        console.log(JSON.stringify(responseInstance))

        const result = await axiosModifierInstance(songId).patch(`sings/${songId.trim()}`, responseInstance)

        console.log(result)

    } catch (error) {
        console.log(error)
    }
}

start()
