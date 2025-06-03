"use client";
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


// Sample data for the user overview chart - matches the image pattern
const userData = [
  { month: 'Jan', users: 15000, color: '#a78bfa' },  // Light purple
  { month: 'Feb', users: 28000, color: '#67e8f9' },  // Teal
  { month: 'Mar', users: 20000, color: '#000000' },  // Black
  { month: 'Apr', users: 27000, color: '#93c5fd' },  // Blue
  { month: 'May', users: 12000, color: '#93c5fd' },  // Blue
  { month: 'Jun', users: 22000, color: '#86efac' },  // Green
  { month: 'Jul', users: 15000, color: '#a78bfa' },  // Light purple
  { month: 'Aug', users: 26000, color: '#67e8f9' },  // Teal
  { month: 'Sep', users: 20000, color: '#000000' },  // Black
  { month: 'Oct', users: 30000, color: '#93c5fd' },  // Blue
  { month: 'Nov', users: 12000, color: '#93c5fd' },  // Blue
  { month: 'Dec', users: 22000, color: '#86efac' },  // Green
];

// Custom tooltip component for hover
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-3 shadow-md rounded-md border border-gray-100">
        <p className="text-sm font-medium">{payload[0].value.toLocaleString()} users</p>
        <p className="text-xs text-gray-500">{payload[0].payload.month}</p>
      </div>
    );
  }
  return null;
};

// Format y-axis ticks to show 'K' for thousands
const formatYAxisTick = (value: number) => {
  if (value === 0) return '0';
  return `${value / 1000}K`;
};

// Custom bar component to use the color from data
const CustomBar = (props: any) => {
  const { x, y, width, height, fill, dataKey, payload } = props;
  
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={"#204C48"}
      
      rx={4}
      ry={4}
    />
  );
};

export const UserOverview: React.FC = () => {
  return (
    <Card className="w-full bg-[#F9F9FA] border-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2 mb-5">
        <CardTitle className="text-xl font-semibold flex items-center">
        
          User Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={userData}
              margin={{ top: 20, right: 5, left: 0, bottom: 5 }}
              barCategoryGap={4}
              barGap={0}
            >
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tickMargin={10}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={formatYAxisTick}
                tickMargin={10}
                domain={[0, 30000]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ opacity: 0.1 }} />
              <Bar 
                dataKey="users" 
                shape={<CustomBar />}
                isAnimationActive={true}
                barSize={15}
                radius={[10, 0, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};