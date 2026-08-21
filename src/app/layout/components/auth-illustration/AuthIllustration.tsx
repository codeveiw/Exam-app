import FeatureCard from "./FeatureCard";
import { features } from "./features";



export default function AuthIllustration() {
    return (
        <div className="">
            {
                features.map((feature, index) =>
                    <FeatureCard key={index} {...feature} />
                )

            }
        </div>
    )
}
