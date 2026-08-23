type ApiEnvelope<T> = {
  success: boolean
  message?: string
  data?: T
  error?: string
}

const BACKEND_API_URL = process.env.BACKEND_API_URL!
const BACKEND_API_KEY = process.env.BACKEND_API_KEY!

async function callAuthApi<T>(path: string, body: unknown): Promise<ApiEnvelope<T>> {
  const res = await fetch(`${BACKEND_API_URL}/auth${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": BACKEND_API_KEY,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  })

  return (await res.json()) as ApiEnvelope<T>
}

export const registerApi = (email: string, password: string, name: string, tenantName: string) => {
  return callAuthApi<{ email: string }>("/register", {
    email,
    password,
    name,
    tenant_name: tenantName,
  })
}

export const loginApi = (email: string, password: string, rememberMe: boolean) => {
  return callAuthApi<{
    token: string
    user: { uuid: string; email: string; role: string; name: string | null }
  }>("/login", {
    email,
    password,
    remember_me: rememberMe,
  })
}

export const verifyOtpApi = (email: string, otp: string) => {
  return callAuthApi<{ email: string }>("/verify-otp", { email, otp })
}

export const resendOtpApi = (email: string) => {
  return callAuthApi<{ email: string }>("/resend-otp", { email })
}
