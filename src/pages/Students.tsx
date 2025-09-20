import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Eye, Edit, Trash2, Plus, Download, Upload } from 'lucide-react';
import { mockStudents } from '../data/mockData';

const Students: React.FC = () => {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter and sort students
  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = selectedClass === 'all' || student.class === selectedClass;
      
      return matchesSearch && matchesClass;
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a];
      let bValue: any = b[sortBy as keyof typeof b];
      
      if (sortBy === 'name') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getRiskColor = (riskScore: number) => {
    if (riskScore < 30) return 'text-green-500 bg-green-100';
    if (riskScore < 50) return 'text-yellow-500 bg-yellow-100';
    if (riskScore < 70) return 'text-orange-500 bg-orange-100';
    return 'text-red-500 bg-red-100';
  };

  const getRiskLevel = (riskScore: number) => {
    if (riskScore < 30) return 'Low';
    if (riskScore < 50) return 'Medium';
    if (riskScore < 70) return 'High';
    return 'Critical';
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const classes = Array.from(new Set(students.map(s => s.class)));
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
          <h1 className="text-3xl font-bold text-white">Students</h1>
          <p className="text-gray-300">Manage and monitor student information</p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="btn-secondary px-4 py-2 flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button className="btn-secondary px-4 py-2 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="btn-primary px-4 py-2 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Student</span>
            </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
            <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
              placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          {/* Class Filter */}
            <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Classes</option>
            {classes.map(cls => (
              <option key={cls} value={cls}>Class {cls}</option>
              ))}
            </select>

          {/* Sort */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order as 'asc' | 'desc');
            }}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="academicScore-desc">Performance (High-Low)</option>
            <option value="academicScore-asc">Performance (Low-High)</option>
            <option value="riskScore-desc">Risk (High-Low)</option>
            <option value="riskScore-asc">Risk (Low-High)</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{filteredStudents.length}</h3>
          <p className="text-gray-300 text-sm">Total Students</p>
        </div>
        <div className="glass-card p-6 text-center">
          <h3 className="text-2xl font-bold text-green-400 mb-2">
            {filteredStudents.filter(s => s.academicScore >= 80).length}
          </h3>
          <p className="text-gray-300 text-sm">High Performers</p>
        </div>
        <div className="glass-card p-6 text-center">
          <h3 className="text-2xl font-bold text-yellow-400 mb-2">
            {filteredStudents.filter(s => s.riskScore >= 50).length}
          </h3>
          <p className="text-gray-300 text-sm">At Risk</p>
        </div>
        <div className="glass-card p-6 text-center">
          <h3 className="text-2xl font-bold text-blue-400 mb-2">
            {Math.round(filteredStudents.reduce((acc, s) => acc + s.attendance, 0) / filteredStudents.length)}%
          </h3>
          <p className="text-gray-300 text-sm">Avg Attendance</p>
        </div>
      </div>

      {/* Students Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{student.name}</div>
                        <div className="text-sm text-gray-400">{student.rollNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">Class {student.class}</div>
                    <div className="text-sm text-gray-400">Section {student.section}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getPerformanceColor(student.academicScore)}`}>
                      {student.academicScore}%
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                        style={{ width: `${student.academicScore}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{student.attendance}%</div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${student.attendance}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(student.riskScore)}`}>
                      {getRiskLevel(student.riskScore)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      <button className="p-1 text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-300">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredStudents.length}</span> of{' '}
            <span className="font-medium">{students.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-2 bg-blue-500 text-white rounded-lg">1</button>
            <button className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
