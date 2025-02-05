import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

interface UserData {
  name: string;
  birthDate: string;
  healthStatus: string;
  vaccines: string[];
  gender: string;
}

const VACCINES = [
  'BCG',
  'Hepatitis B',
  'DPT',
  'Polio',
  'HIB',
  'PCV',
  'Rotavirus',
  'MMR',
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    birthDate: '',
    healthStatus: '',
    vaccines: [],
    gender: '',
  });

  const handleSubmit = () => {
    localStorage.setItem('userData', JSON.stringify(userData));
    onComplete();
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">MamaCare Companion</h1>
            <p className="text-gray-600 mb-8">Your trusted partner in postnatal care</p>
            <button
              onClick={() => setStep(1)}
              className="bg-blue-600 text-white px-8 py-3 rounded-full flex items-center justify-center mx-auto hover:bg-blue-700"
            >
              Continue
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        );

      default:
        return (
          <div className="p-6">
            <div className="mb-6">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 6) * 100}%` }}
                />
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">What's your child's name?</h2>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter child's name"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">When was your child born?</h2>
                <input
                  type="date"
                  value={userData.birthDate}
                  onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">What's your child's health status?</h2>
                <select
                  value={userData.healthStatus}
                  onChange={(e) => setUserData({ ...userData, healthStatus: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select status</option>
                  <option value="healthy">Healthy</option>
                  <option value="premature">Premature</option>
                  <option value="special">Special Needs</option>
                </select>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Which vaccines has your child received?</h2>
                <div className="space-y-2">
                  {VACCINES.map((vaccine) => (
                    <label key={vaccine} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={userData.vaccines.includes(vaccine)}
                        onChange={(e) => {
                          const newVaccines = e.target.checked
                            ? [...userData.vaccines, vaccine]
                            : userData.vaccines.filter((v) => v !== vaccine);
                          setUserData({ ...userData, vaccines: newVaccines });
                        }}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span>{vaccine}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">What's your child's gender?</h2>
                <div className="space-y-2">
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <label key={gender} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="gender"
                        value={gender.toLowerCase()}
                        checked={userData.gender === gender.toLowerCase()}
                        onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mr-4 px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  if (step === 5) {
                    handleSubmit();
                  } else {
                    setStep(step + 1);
                  }
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                {step === 5 ? 'Complete' : 'Next'}
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg">
        {renderStep()}
      </div>
    </div>
  );
}