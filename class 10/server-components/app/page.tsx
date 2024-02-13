import { QueryTypes } from "sequelize";
import { revalidatePath } from "next/cache";

import getDb from "./db";

async function createContact(formData: FormData) {
  "use server"

  const firstName = formData.get("first_name");
  const lastName = formData.get("last_name");
  const isFavorite = formData.get("is_favorite");

  const db = getDb();
  await db.query(
    "INSERT INTO `contacts` (first_name, last_name, is_favorite) VALUES (?, ?, ?)",
    { replacements: [firstName, lastName, isFavorite], type: QueryTypes.INSERT }
  );

  revalidatePath("/");
  return true;
}

async function Page() {
  const db = getDb();
  const users = await db.query("SELECT * FROM `contacts`", { type: QueryTypes.SELECT });

  return (
    <main style={{ fontFamily: "system-ui", padding: "1rem" }}>
      <h1 style={{ marginTop: 0 }}>Contacts</h1>
      <ul style={{ padding: 0 }}>
        {users.map((user: any) => (
          <li key={user.id} style={{ display: "flex", gap: "0.5rem", padding: "0.25rem" }}>
            {user.is_favorite ? "⭐️" : "☆"}
            <div>
              {user.first_name} {user.last_name}
            </div>
          </li>
        ))}
      </ul>
      <form key={users.length} action={createContact} style={{ backgroundColor: "#e7e5e4", padding: "1rem", borderRadius: 8, display: "flex", gap: "0.5rem", flexDirection: "column", alignItems: "baseline" }}>
        <input type="text" placeholder="First Name" name="first_name" required />
        <input type="text" placeholder="Last Name" name="last_name" required />
        <label htmlFor="is_favorite_button">
          Favorite
          <input type="checkbox" name="is_favorite" id="is_favorite_button" />
        </label>
        <button type="submit">Add Contact</button>
      </form>
    </main>
  );
}

export default Page
