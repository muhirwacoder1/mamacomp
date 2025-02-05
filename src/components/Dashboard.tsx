import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Baby, Apple, Youtube, ChevronFirst as FirstAid } from 'lucide-react';

interface AgeCard {
  range: string;
  content: {
    breastfeeding: string[];
    nutrition: string[];
    videos: { title: string; url: string }[];
    health: { condition: string; remedy: string }[];
  };
}

const AGE_CARDS: AgeCard[] = [
  {
    range: '0-2 months',
    content: {
      breastfeeding: [
        'Feed every 2-3 hours',
        'Look for hunger cues',
        'Ensure proper latch',
        'Wake baby for feeding if needed',
        'Track wet and dirty diapers'
      ],
      nutrition: [
        'Exclusive breastfeeding recommended',
        'No water or other liquids needed',
        '8-12 feedings per day',
        'Feed on demand'
      ],
      videos: [
        {
          title: 'Proper Latching Techniques',
          url: 'https://www.youtube.com/embed/wjt-Ashodw8',
        },
        {
          title: 'Newborn Care Basics',
          url: 'https://www.youtube.com/embed/j7YFo2xRHQ8'
        }
      ],
      health: [
        {
          condition: 'Colic',
          remedy: 'Try gentle rocking and white noise'
        },
        {
          condition: 'Jaundice',
          remedy: 'Regular feeding and monitoring by healthcare provider'
        }
      ],
    },
  },
  {
    range: '3-4 months',
    content: {
      breastfeeding: [
        'Feed every 3-4 hours',
        'Maintain consistent feeding schedule',
        'Watch for growth spurts',
        'Begin establishing feeding routine'
      ],
      nutrition: [
        'Continue exclusive breastfeeding',
        'No solid foods yet',
        '6-8 feedings per day',
        'Monitor weight gain'
      ],
      videos: [
        {
          title: 'Understanding Baby Sleep Patterns',
          url: 'https://www.youtube.com/embed/dGk1kL5P5Pc'
        },
        {
          title: 'Tummy Time Exercises',
          url: 'https://www.youtube.com/embed/M3DsEXPZ0Ks'
        }
      ],
      health: [
        {
          condition: 'Teething Signs',
          remedy: 'Cool teething rings and gentle gum massage'
        },
        {
          condition: 'Sleep Regression',
          remedy: 'Maintain consistent bedtime routine and comfort measures'
        }
      ],
    },
  },
  {
    range: '5-6 months',
    content: {
      breastfeeding: [
        'Continue breastfeeding on demand',
        'Watch for signs of readiness for solids',
        'Maintain milk supply',
        'Consider pumping schedule if working'
      ],
      nutrition: [
        'Begin introducing solid foods',
        'Start with iron-fortified cereals',
        'Single-ingredient purees',
        'Continue breast milk as main nutrition source'
      ],
      videos: [
        {
          title: 'Starting Solid Foods',
          url: 'https://www.youtube.com/embed/D3_S9PLp8bk'
        },
        {
          title: 'Baby Food Preparation Guide',
          url: 'https://www.youtube.com/embed/Ygl5I_1CpVo'
        }
      ],
      health: [
        {
          condition: 'Food Allergies',
          remedy: 'Introduce new foods one at a time, monitor for reactions'
        },
        {
          condition: 'Diaper Rash',
          remedy: 'Keep area dry, use barrier cream, frequent changes'
        }
      ],
    },
  },
  {
    range: '7-8 months',
    content: {
      breastfeeding: [
        'Continue breastfeeding alongside solids',
        'Maintain feeding schedule',
        'Watch for nursing strikes',
        'Support milk supply'
      ],
      nutrition: [
        'Increase variety of solid foods',
        'Introduce finger foods',
        'Watch for pincer grasp development',
        'Offer water in sippy cup'
      ],
      videos: [
        {
          title: 'Baby-Led Weaning Tips',
          url: 'https://www.youtube.com/embed/XeJSXfO5Q5g'
        },
        {
          title: 'Safe Finger Foods Guide',
          url: 'https://www.youtube.com/embed/FzHMqUMh9Hs'
        }
      ],
      health: [
        {
          condition: 'Constipation',
          remedy: 'Increase fluid intake, fiber-rich foods, gentle tummy massage'
        },
        {
          condition: 'Common Cold',
          remedy: 'Humidifier, nasal suction, plenty of fluids'
        }
      ],
    },
  },
  {
    range: '9-10 months',
    content: {
      breastfeeding: [
        'Continue breastfeeding as desired',
        'Adapt to increased mobility',
        'Maintain feeding sessions',
        'Consider weaning plans'
      ],
      nutrition: [
        'Three meals a day plus snacks',
        'Variety of textures and tastes',
        'Self-feeding encouragement',
        'Family meal participation'
      ],
      videos: [
        {
          title: 'Developmental Milestones',
          url: 'https://www.youtube.com/embed/G_UJkAYdR4c'
        },
        {
          title: 'Mealtime Routines',
          url: 'https://www.youtube.com/embed/UVqH2zPZrqE'
        }
      ],
      health: [
        {
          condition: 'Separation Anxiety',
          remedy: 'Consistent routines, comfort objects, gradual transitions'
        },
        {
          condition: 'Sleep Regression',
          remedy: 'Maintain bedtime routine, comfort measures, patience'
        }
      ],
    },
  },
  {
    range: '11-12 months',
    content: {
      breastfeeding: [
        'Continue breastfeeding if desired',
        'Begin weaning process if ready',
        'Gradual reduction of feeds',
        'Emotional support during transitions'
      ],
      nutrition: [
        'Transition to table foods',
        'Three meals and 2-3 snacks',
        'Introduce whole milk (after 12 months)',
        'Family meal participation'
      ],
      videos: [
        {
          title: 'Transitioning to Table Foods',
          url: 'https://www.youtube.com/embed/L5HGVPs_CfE'
        },
        {
          title: 'First Birthday Nutrition Guide',
          url: 'https://www.youtube.com/embed/O5gBmXyH5hE'
        }
      ],
      health: [
        {
          condition: 'Walking Injuries',
          remedy: 'Childproof home, supervision, proper footwear'
        },
        {
          condition: 'Teething Pain',
          remedy: 'Cold teething rings, gentle gum massage, pain relief if needed'
        }
      ],
    },
  },
  {
    range: '13-18 months',
    content: {
      breastfeeding: [
        'Continue breastfeeding if mutually desired',
        'Support during weaning process',
        'Emotional transitions',
        'New comfort measures'
      ],
      nutrition: [
        'Full family meal participation',
        'Balanced diet with variety',
        'Regular meal and snack schedule',
        'Encourage self-feeding skills'
      ],
      videos: [
        {
          title: 'Toddler Nutrition Guide',
          url: 'https://www.youtube.com/embed/K5tVbVu9Mkg'
        },
        {
          title: 'Managing Picky Eating',
          url: 'https://www.youtube.com/embed/kKuYfLM0yDc'
        }
      ],
      health: [
        {
          condition: 'Picky Eating',
          remedy: 'Offer variety, be patient, maintain routine, avoid pressure'
        },
        {
          condition: 'Sleep Resistance',
          remedy: 'Consistent bedtime routine, clear boundaries, comfort object'
        }
      ],
    },
  },
  {
    range: '19-24 months',
    content: {
      breastfeeding: [
        'Natural weaning support',
        'Emotional transitions',
        'New bonding activities',
        'Gentle weaning techniques'
      ],
      nutrition: [
        'Independent eating skills',
        'Balanced meal planning',
        'Healthy snack choices',
        'Family meal participation'
      ],
      videos: [
        {
          title: 'Toddler Development Milestones',
          url: 'https://www.youtube.com/embed/J5NxqPGIMsE'
        },
        {
          title: 'Positive Mealtime Behaviors',
          url: 'https://www.youtube.com/embed/L8m5qTHhq5M'
        }
      ],
      health: [
        {
          condition: 'Tantrums',
          remedy: 'Consistent boundaries, positive reinforcement, patience'
        },
        {
          condition: 'Common Illnesses',
          remedy: 'Good hygiene, balanced diet, adequate rest'
        }
      ],
    },
  }
];

export default function Dashboard() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const childAge = userData.birthDate
    ? Math.floor((Date.now() - new Date(userData.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 30))
    : 0;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-lg shadow-lg text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-xl opacity-90">
            {userData.name} is {childAge} months old
          </p>
          <div className="mt-4 bg-white/10 rounded-lg p-4">
            <p className="text-sm">
              Track your baby's growth, get personalized advice, and connect with healthcare providers.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {AGE_CARDS.map((card) => (
          <div key={card.range} className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => setExpandedCard(expandedCard === card.range ? null : card.range)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
            >
              <span className="font-medium">{card.range}</span>
              {expandedCard === card.range ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedCard === card.range && (
              <div className="px-6 pb-4 space-y-4">
                {/* Breastfeeding Section */}
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'breastfeeding' ? null : 'breastfeeding')}
                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-50"
                  >
                    <div className="flex items-center">
                      <Baby className="w-5 h-5 mr-2 text-blue-500" />
                      <span>Breastfeeding Tips</span>
                    </div>
                    {expandedSection === 'breastfeeding' ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  {expandedSection === 'breastfeeding' && (
                    <div className="p-4">
                      <ul className="list-disc list-inside space-y-2">
                        {card.content.breastfeeding.map((tip, index) => (
                          <li key={index} className="text-gray-700">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Nutrition Section */}
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'nutrition' ? null : 'nutrition')}
                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-50"
                  >
                    <div className="flex items-center">
                      <Apple className="w-5 h-5 mr-2 text-green-500" />
                      <span>Nutrition Guide</span>
                    </div>
                    {expandedSection === 'nutrition' ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  {expandedSection === 'nutrition' && (
                    <div className="p-4">
                      <ul className="list-disc list-inside space-y-2">
                        {card.content.nutrition.map((item, index) => (
                          <li key={index} className="text-gray-700">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Videos Section */}
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'videos' ? null : 'videos')}
                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-50"
                  >
                    <div className="flex items-center">
                      <Youtube className="w-5 h-5 mr-2 text-red-500" />
                      <span>Helpful Videos</span>
                    </div>
                    {expandedSection === 'videos' ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  {expandedSection === 'videos' && (
                    <div className="p-4 space-y-4">
                      {card.content.videos.map((video, index) => (
                        <div key={index}>
                          <h4 className="font-medium mb-2">{video.title}</h4>
                          <div className="aspect-w-16 aspect-h-9">
                            <iframe
                              src={video.url}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full rounded"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Health Section */}
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'health' ? null : 'health')}
                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-50"
                  >
                    <div className="flex items-center">
                      <FirstAid className="w-5 h-5 mr-2 text-red-500" />
                      <span>Common Health Issues</span>
                    </div>
                    {expandedSection === 'health' ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  {expandedSection === 'health' && (
                    <div className="p-4">
                      {card.content.health.map((item, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                          <h4 className="font-medium text-red-600 mb-1">{item.condition}</h4>
                          <p className="text-gray-700">{item.remedy}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}