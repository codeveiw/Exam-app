interface FeatureCardProps {
  
  title: string;
  description: string;
  icon: string;
}

export default function FeatureCard({  title, description, icon }: FeatureCardProps) {
  return (
    <div className="flex pe-6">
      <div className="flex items-center justify-center text-blue-600  me-5 w-50 h-20">
        <img src={icon} alt="" />
      </div>

      <div className="p-3">
        <h3 className=" text-blue-600 text-lg font-semibold max-w-sm">{title}</h3>
        <p className="text-gray-700 max-w-sm font-medium ">{description}</p>
      </div>
      </div>

  )
}
