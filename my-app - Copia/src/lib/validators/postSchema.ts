
import { z } from "zod"

export const postSchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  content: z.string().min(10, "Conteúdo muito curto"),
  authorId: z.number(),
})
