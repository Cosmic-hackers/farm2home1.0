import { createClient } from "@supabase/supabase-js"
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function login() {
    const { error } = await supabase.auth.signInWithPassword({
        email: 'yadagirisiddu308@gmail.com',
        password: 'cosmoss'
    })
    if (error) {
        console.error("Login failed:", error)
        process.exit(1)
    }
    console.log("Logged in as yadagirisiddu308@gmail.com")
}

const updates = [
    {
        productName: "Raw Honey",
        imagePath: "C:/Users/siddu/.gemini/antigravity/brain/8638a2eb-f7c2-4094-b3e3-f26e4b975c4b/uploaded_image_0_1765312531500.png",
        uploadName: "raw-honey-update.png"
    },
    {
        productName: "Farm Fresh Eggs",
        imagePath: "C:/Users/siddu/.gemini/antigravity/brain/8638a2eb-f7c2-4094-b3e3-f26e4b975c4b/uploaded_image_1_1765312531500.png",
        uploadName: "fresh-eggs-update.png"
    },
    {
        productName: "Test Product No Image",
        imagePath: "C:/Users/siddu/.gemini/antigravity/brain/8638a2eb-f7c2-4094-b3e3-f26e4b975c4b/uploaded_image_2_1765312531500.png",
        uploadName: "test-product-update.png"
    },
    {
        productName: "carrot", // User specifically said "carrot"
        imagePath: "C:/Users/siddu/.gemini/antigravity/brain/8638a2eb-f7c2-4094-b3e3-f26e4b975c4b/uploaded_image_3_1765312531500.png",
        uploadName: "carrot-update.png"
    }
]

async function updateImages() {
    console.log("Starting image update process...")

    // 0. Ensure bucket exists (Best effort)
    console.log("Checking bucket...")
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()

    if (listError) {
        console.error("Error listing buckets:", listError)
    }

    const bucketExists = buckets?.find(b => b.name === 'product-images')

    if (!bucketExists) {
        console.log("Bucket 'product-images' not found. Attempting to create (might fail)...")
        const { error: bucketError } = await supabase.storage.createBucket('product-images', {
            public: true,
            fileSizeLimit: 5242880,
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
        })
        if (bucketError) {
            console.error("Error creating bucket (likely RLS):", bucketError)
            console.log("Will try to upload anyway, or use fallback if implemented.")
        } else {
            console.log("Bucket created.")
        }
    } else {
        console.log("Bucket exists.")
    }

    for (const update of updates) {
        console.log(`Processing ${update.productName}...`)

        // 1. Read file
        try {
            const fileContent = fs.readFileSync(update.imagePath)

            // 2. Upload to Supabase
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(update.uploadName, fileContent, {
                    contentType: 'image/png',
                    upsert: true
                })

            let publicUrl = ""

            if (uploadError) {
                console.error(`Error uploading image for ${update.productName}:`, uploadError)
                // Fallback: If upload fails (e.g. bucket missing), we can't get a public URL from Supabase.
                // We could copy file to public folder, but that requires Next.js to serve it.
                // Let's try to proceed with local file copy if upload fails.

                const publicDir = path.join(process.cwd(), 'public', 'products')
                if (!fs.existsSync(publicDir)) {
                    fs.mkdirSync(publicDir, { recursive: true })
                }
                const destPath = path.join(publicDir, update.uploadName)
                fs.copyFileSync(update.imagePath, destPath)
                publicUrl = `/products/${update.uploadName}`
                console.log(`Fallback: Copied image to ${publicUrl}`)
            } else {
                // 3. Get Public URL
                const { data } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(update.uploadName)
                publicUrl = data.publicUrl
                console.log(`Uploaded image to ${publicUrl}`)
            }

            // 4. Update Product(s)
            // We use ilike to match case-insensitive
            const { data: products, error: searchError } = await supabase
                .from('products')
                .select('id, name')
                .ilike('name', update.productName)

            if (searchError) {
                console.error(`Error searching for product ${update.productName}:`, searchError)
                continue
            }

            if (!products || products.length === 0) {
                console.log(`No product found matching "${update.productName}". Skipping update.`)
                continue
            }

            for (const product of products) {
                const { error: updateError } = await supabase
                    .from('products')
                    .update({ image_url: publicUrl })
                    .eq('id', product.id)

                if (updateError) {
                    console.error(`Error updating product ${product.name} (${product.id}):`, updateError)
                } else {
                    console.log(`Successfully updated image for ${product.name} (${product.id})`)
                }
            }

        } catch (err) {
            console.error(`Failed to process ${update.productName}:`, err)
        }
    }
    console.log("Update complete!")
}

login().then(updateImages)
