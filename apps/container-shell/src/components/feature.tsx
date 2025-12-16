
export const Feature = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
    return (
       <div className="flex gap-4 p-4">
            <div className="flex-shrink-0">{icon}</div>
            <div>
                <h4 className="font-bold text-xl text-blue-800 mb-2">{title}</h4>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
        </div>

    )
};