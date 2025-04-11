addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const targetUrl = url.searchParams.get('url')

  if (!targetUrl) {
    return new Response('Missing "url" query parameter", { status: 400 })
  }

  const response = await fetch(`https://mercury.postlight.com/parser?url=${encodeURIComponent(targetUrl)}`, {
    headers: {
      'x-api-key': 'demo'
    }
  })

  const data = await response.json()
  return new Response(JSON.stringify({
    title: data.title,
    content: data.content,
    date_published: data.date_published
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
}
