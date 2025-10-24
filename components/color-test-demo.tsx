/**
 * Color Test Component
 * Test all Mommy Leveling color improvements
 */

'use client'

import React, { useState } from 'react'
import { ToneCustomizationPanel, ToneFloatingControl, ToneModesSelector } from '@/components/tone-customization-ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Sparkles, Settings, Palette } from 'lucide-react'

export function ColorTestDemo() {
  const [showPanel, setShowPanel] = useState(false)

  return (
    <div className="w-full max-w-full overflow-x-hidden p-6 space-y-8 bg-gradient-to-br from-cream via-white to-mint/5">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Palette className="w-8 h-8 text-peach" />
          Mommy Leveling Color Showcase
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Experience the warm, nurturing color palette designed to make every mom feel supported and loved.
        </p>
      </div>

      {/* Color Palette Demo */}
      <Card className="border-peach/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-peach/5 to-lavender/5">
          <CardTitle className="text-slate-700 flex items-center gap-2">
            <Heart className="w-5 h-5 text-peach" />
            Color Palette
          </CardTitle>
          <CardDescription className="text-slate-600">
            Our emotionally crafted color system
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-peach to-peach/80 shadow-lg border-2 border-white"></div>
              <div>
                <h3 className="font-medium text-slate-700">Peach</h3>
                <p className="text-xs text-slate-500">#FFD6C9</p>
                <Badge variant="secondary" className="text-xs mt-1">Warmth</Badge>
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-lavender to-lavender/80 shadow-lg border-2 border-white"></div>
              <div>
                <h3 className="font-medium text-slate-700">Lavender</h3>  
                <p className="text-xs text-slate-500">#E7D1FF</p>
                <Badge variant="secondary" className="text-xs mt-1">Calm</Badge>
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-mint to-mint/80 shadow-lg border-2 border-white"></div>
              <div>
                <h3 className="font-medium text-slate-700">Mint</h3>
                <p className="text-xs text-slate-500">#C8F2D4</p>
                <Badge variant="secondary" className="text-xs mt-1">Growth</Badge>
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-baby-blue to-baby-blue/80 shadow-lg border-2 border-white"></div>
              <div>
                <h3 className="font-medium text-slate-700">Baby Blue</h3>
                <p className="text-xs text-slate-500">#BCE5FF</p>
                <Badge variant="secondary" className="text-xs mt-1">Trust</Badge>
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cream to-cream/80 shadow-lg border-2 border-white"></div>
              <div>
                <h3 className="font-medium text-slate-700">Cream</h3>
                <p className="text-xs text-slate-500">#FFF9F6</p>
                <Badge variant="secondary" className="text-xs mt-1">Comfort</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tone Selector Demo */}
      <Card className="border-peach/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-lavender/5 to-peach/5">
          <CardTitle className="text-slate-700 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-lavender" />
            Tone Mode Selector
          </CardTitle>
          <CardDescription className="text-slate-600">
            Interactive tone selection with warm colors
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-slate-700">Compact Version</h4>
            <div className="flex justify-center">
              <ToneModesSelector variant="compact" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-slate-700">Grid Version</h4>
            <ToneModesSelector variant="grid" />
          </div>
        </CardContent>
      </Card>

      {/* Button Variations */}
      <Card className="border-peach/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-mint/5 to-baby-blue/5">
          <CardTitle className="text-slate-700 flex items-center gap-2">
            <Settings className="w-5 h-5 text-mint" />
            Button Styles
          </CardTitle>
          <CardDescription className="text-slate-600">
            Various button styles with warm theming
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <Button className="bg-gradient-to-r from-peach to-lavender hover:shadow-lg">
              <Heart className="w-4 h-4 mr-2" />
              Primary Action
            </Button>
            
            <Button variant="outline" className="border-peach text-peach hover:bg-peach/10">
              <Sparkles className="w-4 h-4 mr-2" />
              Outline Style
            </Button>
            
            <Button variant="ghost" className="text-lavender hover:bg-lavender/10">
              <Settings className="w-4 h-4 mr-2" />
              Ghost Style
            </Button>
            
            <Button variant="secondary" className="bg-mint/20 text-mint hover:bg-mint/30">
              Secondary
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gradient Backgrounds */}
      <Card className="border-peach/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-700">Gradient Backgrounds</CardTitle>
          <CardDescription className="text-slate-600">
            Beautiful gradient combinations for different moods
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-6 rounded-xl bg-gradient-to-br from-peach/20 to-lavender/20 border border-peach/30">
              <h4 className="font-medium text-slate-700 mb-2">Warm Gradient</h4>
              <p className="text-sm text-slate-600">Perfect for welcome messages</p>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-mint/20 to-baby-blue/20 border border-mint/30">
              <h4 className="font-medium text-slate-700 mb-2">Cool Gradient</h4>
              <p className="text-sm text-slate-600">Great for calming content</p>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-cream/50 to-peach/10 border border-cream/50">
              <h4 className="font-medium text-slate-700 mb-2">Soft Gradient</h4>
              <p className="text-sm text-slate-600">Ideal for backgrounds</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customization Panel Demo */}
      <Card className="border-peach/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-700">Tone Customization Panel</CardTitle>
          <CardDescription className="text-slate-600">
            Full customization interface with improved colors
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <ToneCustomizationPanel>
              <Button className="bg-gradient-to-r from-peach to-lavender">
                <Settings className="w-4 h-4 mr-2" />
                Open Tone Settings
              </Button>
            </ToneCustomizationPanel>
          </div>
        </CardContent>
      </Card>

      {/* Floating Control Demo */}
      <div className="fixed bottom-6 right-6">
        <ToneFloatingControl />
      </div>

      {/* Color Accessibility */}
      <Card className="border-mint/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-mint/5 to-cream/20">
          <CardTitle className="text-slate-700">Color Accessibility</CardTitle>
          <CardDescription className="text-slate-600">
            Our colors meet WCAG guidelines for readability
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-slate-700">Text Contrast Examples</h4>
              <div className="space-y-2">
                <div className="p-3 bg-peach/10 rounded-lg">
                  <p className="text-slate-700">Dark text on light peach background</p>
                </div>
                <div className="p-3 bg-lavender/15 rounded-lg">
                  <p className="text-slate-700">Dark text on light lavender background</p>
                </div>
                <div className="p-3 bg-mint/15 rounded-lg">
                  <p className="text-slate-700">Dark text on light mint background</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-slate-700">Interactive Elements</h4>
              <div className="space-y-2">
                <Badge className="bg-peach text-white">Peach Badge</Badge>
                <Badge className="bg-lavender text-white">Lavender Badge</Badge>
                <Badge className="bg-mint text-white">Mint Badge</Badge>
                <Badge variant="outline" className="border-peach text-peach">Outline Badge</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ColorTestDemo