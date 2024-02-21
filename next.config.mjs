import million from 'million/compiler'

/** @type {import('next').NextConfig} */
const nextConfig = {}

const millionConfig = {
	auto: true,
}

export default million.next(nextConfig, millionConfig)
