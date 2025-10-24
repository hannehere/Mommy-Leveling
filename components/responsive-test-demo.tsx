/**
 * Responsive Test Component
 * Demo component to test all responsive fixes
 */

'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Users, Star, Calendar } from 'lucide-react'

export function ResponsiveTestDemo() {
  return (
    <div className="w-full max-w-full overflow-x-hidden p-4 space-y-8">
      {/* Header Section */}
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 px-4">
          Responsive Design Test
        </h1>
        <p className="text-center text-gray-600 px-4 max-w-2xl mx-auto">
          Testing all responsive breakpoints and overflow prevention
        </p>
      </div>

      {/* Button Grid Test */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">Button Responsive Test</h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
          <Button className="w-full sm:w-auto bg-gradient-to-r from-peach to-lavender">
            <Heart className="w-4 h-4 mr-2" />
            Primary Action
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Users className="w-4 h-4 mr-2" />
            Secondary Action
          </Button>
          <Button variant="ghost" className="w-full sm:w-auto">
            <Star className="w-4 h-4 mr-2" />
            Tertiary Action
          </Button>
        </div>
      </div>

      {/* Card Grid Test */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">Card Grid Responsive Test</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} className="w-full max-w-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Card {i}</CardTitle>
                  <Badge variant="secondary">Test</Badge>
                </div>
                <CardDescription>
                  This is a test card to check responsive behavior on different screen sizes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Sample content</span>
                  </div>
                  <Button size="sm" className="w-full">
                    Action Button
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Long Content Test */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">Long Content Overflow Test</h2>
        <Card className="w-full max-w-full">
          <CardHeader>
            <CardTitle>Very Long Title That Should Wrap Properly on Small Screens Without Causing Horizontal Overflow Issues</CardTitle>
            <CardDescription>
              This is a very long description that tests how text wraps on different screen sizes and ensures no horizontal scrolling occurs even with lengthy content that might otherwise cause layout issues.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg overflow-hidden">
                <code className="text-xs break-all">
                  very-long-code-line-that-should-break-properly-without-causing-horizontal-scroll-this-is-a-test-of-text-breaking-behavior
                </code>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['Tag1', 'Very Long Tag Name', 'Another Tag', 'Responsive', 'Design', 'Test', 'Mobile', 'Tablet', 'Desktop'].map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Stack Test */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">Mobile Stack Test</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Left Column</h3>
            <Card className="w-full">
              <CardContent className="p-6">
                <p className="text-sm text-gray-600">
                  Content that should stack vertically on mobile and sit side-by-side on desktop.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Right Column</h3>
            <Card className="w-full">
              <CardContent className="p-6">
                <p className="text-sm text-gray-600">
                  This tests the responsive grid behavior across different breakpoints.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Screen Size Indicator */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Current Screen Size:</h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 bg-blue-100 rounded block sm:hidden">📱 Mobile (< 640px)</span>
              <span className="px-2 py-1 bg-blue-100 rounded hidden sm:block md:hidden">📱 Small (640px+)</span>
              <span className="px-2 py-1 bg-blue-100 rounded hidden md:block lg:hidden">💻 Medium (768px+)</span>
              <span className="px-2 py-1 bg-blue-100 rounded hidden lg:block xl:hidden">💻 Large (1024px+)</span>
              <span className="px-2 py-1 bg-blue-100 rounded hidden xl:block">🖥️ Extra Large (1280px+)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ResponsiveTestDemo