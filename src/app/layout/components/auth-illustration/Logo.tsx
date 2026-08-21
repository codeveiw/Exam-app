import icon from "../../../../assets/icons/logo.svg"

export default function Logo() {
  return (
    <div className="flex items-center gap-3 pt-7 ">
        
            <img src={icon} alt="Logo" />
       
            <p className="text-blue-600 text-2xl font-bold">Exam App</p>
        
      
    </div>
  )
}
