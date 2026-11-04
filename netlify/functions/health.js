exports.handler = async function () {
  try {
    const SUPABASE_URL =
      process.env.SUPABASE_URL;

    const SUPABASE_PUBLISHABLE_KEY =
      process.env.SUPABASE_PUBLISHABLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        },
        body: JSON.stringify({
          ok: false,
          service: "KLOUDEP Business Compliance",
          error: "Health-check environment is not configured"
        })
      };
    }

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/health_check?id=eq.1&select=status`,
      {
        method: "GET",
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(
        `Supabase returned HTTP ${response.status}`
      );
    }

    const data = await response.json();

    const healthy =
      Array.isArray(data) &&
      data.length === 1 &&
      data[0].status === "ok";

    return {
      statusCode: healthy ? 200 : 503,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify({
        ok: healthy,
        service: "KLOUDEP Business Compliance"
      })
    };

  } catch (error) {
    console.error("KLOUDEP health check failed:", error);

    return {
      statusCode: 503,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify({
        ok: false,
        service: "KLOUDEP Business Compliance"
      })
    };
  }
};
