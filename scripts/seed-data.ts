import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
  console.log("Seeding data...")

  const farmers = [
    {
      id: "00000000-0000-0000-0000-000000000001",
      email: "farmer1@example.com",
      full_name: "John McDonald",
      farm_name: "Green Valley Organics",
      farm_desc: "Family owned organic farm since 1985.",
      location: "Portland, OR",
      image: "/idyllic-farm.png",
    },
    {
      id: "00000000-0000-0000-0000-000000000002",
      email: "farmer2@example.com",
      full_name: "Sarah Jenkins",
      farm_name: "Sunny Side Up Farms",
      farm_desc: "Free range eggs and poultry raised with love.",
      location: "Salem, OR",
      image: "/idyllic-farm.png",
    },
    {
      id: "00000000-0000-0000-0000-000000000003",
      email: "farmer3@example.com",
      full_name: "Miguel Rodriguez",
      farm_name: "Rodriguez Family Orchard",
      farm_desc: "Best apples, pears, and cherries in the valley.",
      location: "Hood River, OR",
      image: "/lush-orchard.png",
    },
    {
      id: "00000000-0000-0000-0000-000000000004",
      email: "farmer4@example.com",
      full_name: "Emily Chen",
      farm_name: "Urban Roots Gardens",
      farm_desc: "Microgreens and specialty herbs grown in the city.",
      location: "Portland, OR",
      image: "/lush-greenhouse.png",
    },
    {
      id: "00000000-0000-0000-0000-000000000005",
      email: "farmer5@example.com",
      full_name: "David Miller",
      farm_name: "Miller's Dairy",
      farm_desc: "Raw milk, cheese, and artisanal yogurt.",
      location: "Tillamook, OR",
      image: "/cows.jpg",
    },
  ]

  const buyers = [
    { id: "00000000-0000-0000-0000-000000000006", email: "buyer1@example.com", full_name: "Alice Smith" },
    { id: "00000000-0000-0000-0000-000000000007", email: "buyer2@example.com", full_name: "Bob Jones" },
    { id: "00000000-0000-0000-0000-000000000008", email: "buyer3@example.com", full_name: "Charlie Brown" },
    { id: "00000000-0000-0000-0000-000000000009", email: "buyer4@example.com", full_name: "Diana Prince" },
    { id: "00000000-0000-0000-0000-000000000010", email: "buyer5@example.com", full_name: "Evan Wright" },
  ]

  // Seed Farmers
  for (const farmer of farmers) {
    // Create Auth User
    const { error: createError } = await supabase.auth.admin.createUser({
      email: farmer.email,
      password: "password123",
      email_confirm: true,
      user_metadata: { full_name: farmer.full_name, role: "farmer" },
    })

    if (createError && !createError.message.includes("already registered")) {
      console.error(`Error creating farmer ${farmer.email}:`, createError)
    } else {
      console.log(`Ensured farmer ${farmer.email} exists`)
    }

    // Get User ID (in case it already existed, we need to fetch it if we didn't force the ID)
    // Actually, for simplicity in this script, we'll assume the ID matches if we could force it,
    // but supabase.auth.admin.createUser doesn't let us easily force ID in all versions.
    // So let's fetch the user by email to get the ID.
    const {
      data: { users },
    } = await supabase.auth.admin.listUsers()
    const user = users.find((u) => u.email === farmer.email)

    if (!user) {
      console.error(`Could not find user ${farmer.email}`)
      continue
    }

    // Update Profile (in case trigger didn't fire or we want to ensure data)
    await supabase.from("profiles").upsert({
      id: user.id,
      role: "farmer",
      full_name: farmer.full_name,
      location: farmer.location,
    })

    // Create Farm
    const { data: farm, error: farmError } = await supabase
      .from("farms")
      .upsert(
        {
          owner_id: user.id,
          name: farmer.farm_name,
          description: farmer.farm_desc,
          location: farmer.location,
          rating: 4.0 + Math.random(),
          image_url: farmer.image,
        },
        { onConflict: "owner_id" },
      ) // Assuming one farm per farmer for now
      .select()
      .single()

    if (farmError) {
      console.error(`Error seeding farm for ${farmer.email}:`, farmError)
      continue
    }

    // Create Products for this farm
    const products = [
      { name: "Organic Carrots", price: 2.99, unit: "lb", category: "Vegetables" },
      { name: "Heirloom Tomatoes", price: 4.5, unit: "lb", category: "Vegetables" },
      { name: "Fresh Eggs", price: 6.0, unit: "dozen", category: "Eggs" },
      { name: "Sourdough Bread", price: 8.0, unit: "loaf", category: "Bakery" },
      { name: "Raw Honey", price: 12.0, unit: "jar", category: "Pantry" },
      { name: "Blueberries", price: 5.5, unit: "pint", category: "Fruit" },
      { name: "Kale Bunch", price: 3.0, unit: "bunch", category: "Vegetables" },
      { name: "Goat Cheese", price: 9.0, unit: "wheel", category: "Dairy" },
    ]

    for (const prod of products) {
      await supabase.from("products").insert({
        farm_id: farm.id,
        name: prod.name,
        description: `Fresh ${prod.name} from ${farmer.farm_name}`,
        price: prod.price,
        unit: prod.unit,
        category: prod.category,
        stock: Math.floor(Math.random() * 100),
        image_url: "/images/attachments-gen-images-public-fresh-farm-vegetables-basket.jpg",
      })
    }
  }

  // Seed Buyers
  for (const buyer of buyers) {
    const { error: createError } = await supabase.auth.admin.createUser({
      email: buyer.email,
      password: "password123",
      email_confirm: true,
      user_metadata: { full_name: buyer.full_name, role: "buyer" },
    })

    if (createError && !createError.message.includes("already registered")) {
      console.error(`Error creating buyer ${buyer.email}:`, createError)
    } else {
      console.log(`Ensured buyer ${buyer.email} exists`)
    }
  }

  console.log("Seeding complete!")
}

seed()
