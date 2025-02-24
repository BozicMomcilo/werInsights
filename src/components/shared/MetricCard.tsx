interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    description?: string;
    icon: React.ElementType;
    trend?: 'up' | 'down';
}

export const MetricCard = ({ title, value, change, description, icon: Icon }: MetricCardProps) => (
    <div className="glass-panel p-6">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-[#B0B3BA] text-sm font-medium mb-2">{title}</h3>
                <div className="metric-value">{value}</div>
            </div>
            <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
            </div>
        </div>
        <div className="flex items-center text-sm">
            <span className="text-[#28E0B9] font-medium">↑ {change}%</span>
            <span className="text-[#B0B3BA] ml-2">Since last month</span>
        </div>

    </div>
);