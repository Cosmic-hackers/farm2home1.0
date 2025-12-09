import { createClient } from "@supabase/supabase-js"
import dotenv from 'dotenv'
import path from 'path'

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const sampleProducts = [
    {
        name: "Fresh Organic Carrots",
        description: "Crunchy, sweet, and grown without pesticides. Perfect for snacking or cooking.",
        price: 45.00,
        unit: "kg",
        category: "Vegetables",
        stock: 50,
        image_url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Red Ripe Tomatoes",
        description: "Juicy, vine-ripened tomatoes bursting with flavor. Great for salads and sauces.",
        price: 60.00,
        unit: "kg",
        category: "Vegetables",
        stock: 30,
        image_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Farm Fresh Eggs",
        description: "Free-range eggs with rich, golden yolks. Gathered daily.",
        price: 120.00,
        unit: "dozen",
        category: "Eggs",
        stock: 20,
        image_url: "https://images.unsplash.com/photo-1582515048687-965d5c8249dc?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Organic Spinach",
        description: "Tender, nutrient-packed spinach leaves. Washed and ready to eat.",
        price: 40.00,
        unit: "bunch",
        category: "Vegetables",
        stock: 40,
        image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Raw Honey",
        description: "Pure, unprocessed honey from local wildflowers. Natural sweetener.",
        price: 350.00,
        unit: "jar",
        category: "Honey",
        stock: 15,
        image_url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Fresh Broccoli",
        description: "Crisp, green broccoli heads rich in vitamins.",
        price: 80.00,
        unit: "kg",
        category: "Vegetables",
        stock: 25,
        image_url: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Sweet Potatoes",
        description: "Naturally sweet and nutritious potatoes.",
        price: 50.00,
        unit: "kg",
        category: "Vegetables",
        stock: 60,
        image_url: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Green Bell Peppers",
        description: "Crunchy and fresh green capsicums.",
        price: 70.00,
        unit: "kg",
        category: "Vegetables",
        stock: 35,
        image_url: "https://images.unsplash.com/photo-1563565375-f3fdf5efa23f?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Fresh Strawberries",
        description: "Sweet, red, and juicy strawberries.",
        price: 250.00,
        unit: "box",
        category: "Fruits",
        stock: 20,
        image_url: "https://images.unsplash.com/photo-1464965911861-746a04b4b0a6?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Organic Milk",
        description: "Fresh, unpasteurized organic milk.",
        price: 65.00,
        unit: "liter",
        category: "Dairy",
        stock: 50,
        image_url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80"
    }
]

async function seed() {
    console.log("Starting seed process...")

    // 1. Sign In or Sign Up
    const email = 'yadagirisiddu308@gmail.com'
    const password = 'cosmoss'

    console.log(`Attempting to sign in as ${email}...`)
    let { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (signInError || !session) {
        console.log("Sign in failed, attempting to sign up...")
        const { data: { session: signUpSession }, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { role: 'farmer' }
            }
        })

        if (signUpError) {
            console.error("Sign up failed:", signUpError)
            return
        }

        session = signUpSession
    }

    if (!session) {
        console.error("No session created. Email confirmation might be required.")
        return
    }

    const user = session.user
    console.log(`Signed in as: ${user.email} (${user.id})`)

    // 2. Get or Create Farm for this user
    let { data: farm } = await supabase.from("farms").select("id").eq("owner_id", user.id).single()

    if (!farm) {
        console.log("Creating farm for user...")
        const { data: newFarm, error: farmError } = await supabase.from("farms").insert({
            owner_id: user.id,
            name: "Yadagiri's Farm",
            description: "Fresh produce from Yadagiri",
            location: "Local"
        }).select().single()

        if (farmError) {
            console.error("Error creating farm:", farmError)
            return
        }
        farm = newFarm
    }

    // 3. Remove existing products for this farm to avoid duplicates and clean up
    console.log("Removing existing products for this farm...")
    const { error: deleteError } = await supabase.from("products").delete().eq("farm_id", farm.id)
    if (deleteError) {
        console.error("Error deleting existing products:", deleteError)
    }

    // 4. Insert Products
    console.log("Inserting products...")
    for (const p of sampleProducts) {
        const { error } = await supabase.from("products").insert({
            ...p,
            farm_id: farm.id
        })
        if (error) console.error(`Error inserting ${p.name}:`, error)
        else console.log(`Inserted ${p.name}`)
    }

    console.log("Seed complete!")
}

seed()
