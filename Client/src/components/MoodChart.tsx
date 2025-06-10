import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { mockMoodData } from '../lib/mockData';

export function MoodChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: mockMoodData.map(d => d.date),
        datasets: [{
          label: 'Mood Score',
          data: mockMoodData.map(d => d.score),
          borderColor: 'hsl(239, 84%, 67%)',
          backgroundColor: 'hsla(239, 84%, 67%, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'hsl(239, 84%, 67%)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            grid: {
              color: 'rgba(148, 163, 184, 0.1)'
            },
            ticks: {
              color: '#64748B'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#64748B'
            }
          }
        },
        elements: {
          point: {
            hoverBackgroundColor: '#4F46E5'
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="relative h-64 w-full">
      <canvas ref={chartRef} />
    </div>
  );
}
