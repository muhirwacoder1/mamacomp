import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  content: string;
  votes: number;
  answers: Answer[];
  createdAt: string;
}

interface Answer {
  id: string;
  content: string;
  author: string;
  isExpert: boolean;
  createdAt: string;
}

export default function QAForum() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState({ title: '', content: '' });

  useEffect(() => {
    const savedQuestions = localStorage.getItem('questions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const question: Question = {
      id: Date.now().toString(),
      title: newQuestion.title,
      content: newQuestion.content,
      votes: 0,
      answers: [],
      createdAt: new Date().toISOString(),
    };
    const updatedQuestions = [question, ...questions];
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    setNewQuestion({ title: '', content: '' });
  };

  const handleVote = (questionId: string, increment: boolean) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        return { ...q, votes: q.votes + (increment ? 1 : -1) };
      }
      return q;
    });
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  // Demo: Add mock expert answer
  const addExpertAnswer = (questionId: string) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        const answer: Answer = {
          id: Date.now().toString(),
          content: "This is a professional response from a healthcare provider. Always consult with your doctor for medical advice.",
          author: "Dr. Smith",
          isExpert: true,
          createdAt: new Date().toISOString(),
        };
        return { ...q, answers: [...q.answers, answer] };
      }
      return q;
    });
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Q&A Forum</h2>
      
      <form onSubmit={handleSubmitQuestion} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Question Title</label>
          <input
            type="text"
            value={newQuestion.title}
            onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Question Details</label>
          <textarea
            value={newQuestion.content}
            onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Post Question
        </button>
      </form>

      <div className="space-y-6">
        {questions.sort((a, b) => b.votes - a.votes).map((question) => (
          <div key={question.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{question.title}</h3>
                <p className="text-gray-600 mt-2">{question.content}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <button
                    onClick={() => handleVote(question.id, true)}
                    className="flex items-center text-gray-500 hover:text-blue-500"
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                  </button>
                  <span className="text-sm font-medium">{question.votes}</span>
                  <button
                    onClick={() => handleVote(question.id, false)}
                    className="flex items-center text-gray-500 hover:text-red-500"
                  >
                    <ThumbsDown className="w-4 h-4 mr-1" />
                  </button>
                  {question.answers.length === 0 && (
                    <button
                      onClick={() => addExpertAnswer(question.id)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Demo: Add Expert Answer
                    </button>
                  )}
                </div>
              </div>
            </div>

            {question.answers.length > 0 && (
              <div className="mt-4 space-y-4">
                <h4 className="font-medium">Answers</h4>
                {question.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className={`p-4 rounded-md ${
                      answer.isExpert ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
                      <span className={`font-medium ${answer.isExpert ? 'text-blue-700' : ''}`}>
                        {answer.author}
                        {answer.isExpert && ' (Healthcare Professional)'}
                      </span>
                    </div>
                    <p className="text-gray-700">{answer.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}