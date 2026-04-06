'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';

const gradeScale: { [key: string]: number } = {
  'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0,
};

export default function GPACalculatorPage() {
  const [courses, setCourses] = useState([
    { name: 'Math', grade: 'A', credits: 3 },
    { name: 'Physics', grade: 'B+', credits: 4 },
  ]);

  const addCourse = () => {
    setCourses([...courses, { name: '', grade: 'A', credits: 3 }]);
  };

  const updateCourse = (idx: number, key: string, value: any) => {
    const newCourses = [...courses];
    newCourses[idx] = { ...newCourses[idx], [key]: value };
    setCourses(newCourses);
  };

  const removeCourse = (idx: number) => {
    setCourses(courses.filter((_, i) => i !== idx));
  };

  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const totalPoints = courses.reduce((sum, c) => sum + gradeScale[c.grade] * c.credits, 0);
  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  return (
    <ToolTemplate
      title="GPA Calculator"
      description="Calculate your GPA"
      icon="🎓"
      onReset={() =>
        setCourses([
          { name: 'Math', grade: 'A', credits: 3 },
          { name: 'Physics', grade: 'B+', credits: 4 },
        ])
      }
    >
      <div className="space-y-6">
        <ToolCard title="Courses">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {courses.map((course, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 p-3 bg-gray-100 dark:bg-slate-900 rounded">
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => updateCourse(idx, 'name', e.target.value)}
                  placeholder="Course name"
                  className="col-span-4 px-2 py-1 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 text-sm"
                />
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse(idx, 'grade', e.target.value)}
                  className="col-span-3 px-2 py-1 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 text-sm"
                >
                  {Object.keys(gradeScale).map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={course.credits}
                  onChange={(e) => updateCourse(idx, 'credits', parseInt(e.target.value))}
                  className="col-span-2 px-2 py-1 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 text-sm"
                  min="1"
                  max="6"
                />
                <button
                  onClick={() => removeCourse(idx)}
                  className="col-span-3 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addCourse}
            className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            + Add Course
          </button>
        </ToolCard>

        <div className="grid lg:grid-cols-3 gap-6">
          <ToolCard>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">GPA</p>
              <p className="text-5xl font-bold text-blue-600">{gpa}</p>
            </div>
          </ToolCard>

          <ToolCard>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Credits</p>
              <p className="text-5xl font-bold text-green-600">{totalCredits}</p>
            </div>
          </ToolCard>

          <ToolCard>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Grade Points</p>
              <p className="text-5xl font-bold text-purple-600">{totalPoints.toFixed(2)}</p>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
