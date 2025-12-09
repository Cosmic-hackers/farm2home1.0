import { createClient } from "@supabase/supabase-js"
import fs from 'fs'
import path from 'path'

// Manually load .env.local
try {
    const envPath = path.resolve(process.cwd(), '.env.local')
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf-8')
        envConfig.split('\n').forEach(line => {
            const parts = line.split('=')
            if (parts.length >= 2) {
                const key = parts[0].trim()
                const value = parts.slice(1).join('=').trim()
                if (key && value) {
                    process.env[key] = value
                }
            }
        })
    }
} catch (e) {
    console.warn("Could not load .env.local", e)
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or Service Role Key. Make sure .env.local exists and contains these variables.")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function createBucket() {
    console.log("Attempting to create 'product-images' bucket...")

    // Check if bucket exists first
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()

    if (listError) {
        console.error("Error listing buckets:", listError)
        return
    }

    const bucketExists = buckets?.find(b => b.name === 'product-images')

    if (bucketExists) {
        console.log("Bucket 'product-images' already exists.")
        return
    }

    const { data, error } = await supabase
        .storage
        .createBucket('product-images', {
            public: true,
            fileSizeLimit: 5242880, // 5MB
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
        })

    if (error) {
        console.error('Error creating bucket:', error)
    } else {
        console.log('Bucket created successfully:', data)
    }
}

createBucket()
