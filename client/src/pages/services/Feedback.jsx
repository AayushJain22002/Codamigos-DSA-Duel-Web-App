import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'
import { Star, Send, CheckCircle2 } from 'lucide-react'

// Helper component for the Textarea (in case you don't have the shadcn ui/textarea file)
const Textarea = ({ className, ...props }) => (
    <textarea
        className={`flex min-h-[120px] w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm ring-offset-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 text-neutral-100 ${className}`}
        {...props}
    />
)

const FeedbackDark = () => {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [category, setCategory] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [submiting, setSubmitting] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', feedback: '' })

    const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/182nSj8ViOYc-8o67KwDegbOklz5i4OeLmQYLkMkl5h4/edit?gid=0#gid=0"

    // 2. EmailJS Config
    const SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID"
    const TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID"
    const PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY"

    const categories = [
        "Suggestion", "Something is broken", "Compliment", "Other"
    ]
    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ ...status, submitting: true })

        const dataPayload = {
            rating,
            category,
            name: formData.name,
            email: formData.email,
            message: formData.feedback,
            date: new Date().toLocaleString()
        }

        try {
            // We run both requests in parallel (Faster)
            await Promise.all([

                // 1. Send to Google Sheets
                fetch(GOOGLE_SHEET_URL, {
                    method: "POST",
                    body: JSON.stringify(dataPayload),
                    headers: { "Content-Type": "text/plain;charset=utf-8" },
                }),

                // 2. Send Email via EmailJS
                emailjs.send(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    {
                        to_name: "Admin",
                        from_name: formData.name || "Anonymous",
                        from_email: formData.email,
                        message: formData.feedback,
                        rating: rating,
                        category: category
                    },
                    PUBLIC_KEY
                )
            ])

            setStatus({ submitted: true, submitting: false, error: false })

        } catch (error) {
            console.error("Error submitting:", error)
            setStatus({ submitted: false, submitting: false, error: true })
            alert("Failed to send. Please check your internet connection.")
        }
    }

    // Dynamic text helper
    const getRatingLabel = () => {
        if (hoverRating === 5 || rating === 5) return "Excellent! 🤩"
        if (hoverRating === 4 || rating === 4) return "Good stuff 🙂"
        if (hoverRating === 3 || rating === 3) return "It was okay 😐"
        if (hoverRating === 2 || rating === 2) return "Not great 😕"
        if (hoverRating === 1 || rating === 1) return "Terrible 😫"
        return "How was your experience?"
    }

    if (submitted) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-neutral-950 text-neutral-50'>
                <Card className="w-full max-w-md bg-neutral-900 border-neutral-800 text-center p-10 animate-in fade-in zoom-in duration-300">
                    <div className='flex justify-center mb-6'>
                        <CheckCircle2 className='w-16 h-16 text-emerald-500' />
                    </div>
                    <h2 className='text-3xl font-bold mb-2 tracking-tight'>Thanks!</h2>
                    <p className='text-neutral-400 mb-8'>We've received your feedback.</p>
                    <Button
                        onClick={() => window.location.reload()}
                        className="bg-white text-black hover:bg-neutral-200 w-full"
                    >
                        Return Home
                    </Button>
                </Card>
            </div>
        )
    }

    return (
        // Main Container - Forcing Dark Neutral Theme
        <div className='my-20 flex items-center justify-center min-h-screen bg-neutral-950 p-4 font-sans text-neutral-50'>

            <Card className="w-full max-w-2xl bg-neutral-900 border-neutral-800 shadow-2xl">
                <CardHeader className="text-center pb-8 border-b border-neutral-800">
                    <CardTitle className="text-3xl font-bold tracking-tight text-white">
                        Feedback
                    </CardTitle>
                    <CardDescription className="text-neutral-400 text-lg">
                        Help us craft a better experience.
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-8 space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* 1. Star Rating */}
                        <div className='flex flex-col items-center space-y-4'>
                            <span className='text-sm font-medium uppercase tracking-widest text-neutral-500'>
                                Rate your Experience
                            </span>
                            <div className='flex gap-2'>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className="focus:outline-none transition-transform hover:scale-110"
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setRating(star)}
                                    >
                                        <Star
                                            className={`w-10 h-10 transition-all duration-200 ${star <= (hoverRating || rating)
                                                ? 'fill-white text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' // Glowing white/filled effect
                                                : 'text-neutral-700'
                                                }`}
                                            strokeWidth={1.5}
                                        />
                                    </button>
                                ))}
                            </div>
                            <p className='text-neutral-300 font-medium h-6 animate-in fade-in'>
                                {getRatingLabel()}
                            </p>
                        </div>

                        {/* 2. Categories (Chips) */}
                        <div className='space-y-3'>
                            <Label className="text-neutral-300">Topic</Label>
                            <div className='flex flex-wrap gap-3'>
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setCategory(cat)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${category === cat
                                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                            : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-neutral-200'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Message Area */}
                        <div className='space-y-3'>
                            <Label className="text-neutral-300">Details</Label>
                            <Textarea
                                placeholder="Tell us what happened..."
                                value={formData.feedback}
                                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                            />
                        </div>

                        {/* 4. User Info */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <Label className="text-neutral-300">Name (Optional)</Label>
                                <Input
                                    className="bg-neutral-950 border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus-visible:ring-neutral-500"
                                    placeholder="Enter name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="text-neutral-300">Email</Label>
                                <Input
                                    type="email"
                                    className="bg-neutral-950 border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus-visible:ring-neutral-500"
                                    placeholder="Enter email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            className="w-full h-12 text-md bg-white text-black hover:bg-neutral-200 transition-all font-semibold"
                            disabled={!rating || !formData.email}
                        >
                            Send Feedback
                            <Send className="w-4 h-4 ml-2" />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default FeedbackDark