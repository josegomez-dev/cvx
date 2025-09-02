'use client'

import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, Calendar, MapPin, CheckCircle, User } from 'lucide-react'
import { education } from '@/lib/data/education'

export function EducationTimeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const timelineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-primary mb-4">Educational Journey</h2>
        <p className="dark:text-white/60 light:text-gray-600 max-w-3xl mx-auto">
          A comprehensive timeline of my academic and professional development journey
        </p>
      </motion.div>

      {/* Horizontal Timeline Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Formal Education Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4"
            >
              <GraduationCap className="h-8 w-8 text-primary" />
            </motion.div>
            <h3 className="text-2xl font-bold text-primary mb-2">Formal Education</h3>
            <p className="dark:text-white/60 light:text-gray-600 text-sm">
              Academic degrees and professional certifications
            </p>
          </div>

          <div className="relative">
            {/* Horizontal Timeline Line */}
            <motion.div
              variants={timelineVariants}
              className="absolute -mt-4 left-6 right-6 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent"
            />

            <div className="space-y-6">
              {education.formal.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative flex items-center space-x-4"
                >
                  {/* Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                    className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg"
                  >
                    <GraduationCap className="h-5 w-5 text-white" />
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex-1 card p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-base font-bold dark:text-white light:text-gray-900">
                        {item.title}
                      </h4>
                      {item.year && (
                        <div className="flex items-center space-x-1 text-primary text-xs font-medium">
                          <Calendar className="h-3 w-3" />
                          <span>{item.year}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs dark:text-white/60 light:text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{item.org}</span>
                    </div>

                    {/* Decorative Elements */}
                    <div className="flex space-x-1 mt-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary/60"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-accent/60"></div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Informal Education Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4"
            >
              <BookOpen className="h-8 w-8 text-secondary" />
            </motion.div>
            <h3 className="text-2xl font-bold text-secondary mb-2">Informal Learning</h3>
            <p className="dark:text-white/60 light:text-gray-600 text-sm">
              Self-directed learning and online courses
            </p>
          </div>

          <div className="relative">
            {/* Horizontal Timeline Line */}
            <motion.div
              variants={timelineVariants}
              className="absolute -mt-4 left-6 right-6 h-0.5 bg-gradient-to-r from-secondary via-accent to-primary"
            />

            <div className="space-y-6">
              {education.informal.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative flex items-center space-x-4"
                >
                  {/* Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                    className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center shadow-lg"
                  >
                    <BookOpen className="h-5 w-5 text-white" />
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex-1 card p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-base font-bold dark:text-white light:text-gray-900">
                        {item.title}
                      </h4>
                      {item.year && (
                        <div className="flex items-center space-x-1 text-secondary text-xs font-medium">
                          <Calendar className="h-3 w-3" />
                          <span>{item.year}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs dark:text-white/60 light:text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{item.org}</span>
                    </div>

                    {/* Decorative Elements */}
                    <div className="flex space-x-1 mt-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary/60"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-accent/60"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
      >
        <div className="card p-6 text-center relative">
          <div className="absolute top-3 right-3">
            <CheckCircle className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary mb-3">
            {education.formal.length}
          </div>
          <div className="text-sm dark:text-white/60 light:text-gray-600">
            Formal Certifications
          </div>
        </div>
        
        <div className="card p-6 text-center relative">
          <div className="absolute top-3 right-3">
            <User className="h-5 w-5 text-secondary" />
          </div>
          <div className="text-3xl font-bold text-secondary mb-3">
            {education.informal.length}
          </div>
          <div className="text-sm dark:text-white/60 light:text-gray-600">
            Informal Courses
          </div>
        </div>
        
        <div className="card p-6 text-center relative">
          <div className="absolute top-3 right-3">
            <span className="text-2xl">🤩</span>
          </div>
          <div className="text-3xl font-bold text-accent mb-3">
            {new Date().getFullYear() - Math.min(...education.formal.map(e => e.year || 0), ...education.informal.map(e => e.year || 0))}
          </div>
          <div className="text-sm dark:text-white/60 light:text-gray-600">
            Years of Learning
          </div>
        </div>
      </motion.div>
    </div>
  )
}
