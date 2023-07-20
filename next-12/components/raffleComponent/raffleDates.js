export default function daysToRaffle(todayDate, raffleDate) {

    const today = todayDate.getUTCDate()
    const todayM = todayDate.getMonth()
    const raffleD = new Date(raffleDate).getUTCDate()
    const raffleM = new Date(raffleDate).getMonth()
    
    const MonthsArray = ['Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre']
    
    if(raffleD - today == 1 && raffleM === todayM){
      return `Juega en 1 dia`
    }else if(raffleD - today > 1 && raffleM === todayM){
      return `Juega en ${raffleD - today} dias`
    }else if(raffleD - today === 0 && raffleM === todayM){
      return 'Juega Hoy'
    }else{
      if(raffleM > todayM){
        return 'Juega el ' + raffleD + ' de ' + MonthsArray[raffleM]
      }else{
        return 'Jugó el ' + raffleD + ' de ' + MonthsArray[raffleM]
      }
    }
}