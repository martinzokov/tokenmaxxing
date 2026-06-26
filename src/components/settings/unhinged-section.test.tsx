import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { UnhingedSection } from "@/components/settings/unhinged-section"
import { useUnhingedStore } from "@/stores/unhinged-store"

describe("UnhingedSection", () => {
  beforeEach(() => {
    useUnhingedStore.setState({
      dramaticMode: true,
      copeIntensity: 50,
      demoMode: true,
      demoScore: 95,
    })
  })

  it("shows escalated demo tier and rank when dramatic mode is on", () => {
    render(<UnhingedSection />)
    expect(screen.getByText(/95 · !!! MAXXED !!! · Token Deity/)).toBeInTheDocument()
  })

  it("hides unhinged demo tier and rank when dramatic mode is off", () => {
    useUnhingedStore.setState({ dramaticMode: false, demoMode: true, demoScore: 95 })
    render(<UnhingedSection />)
    expect(screen.getByText("95")).toBeInTheDocument()
    expect(screen.queryByText(/!!! MAXXED !!!/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Token Deity/)).not.toBeInTheDocument()
  })

  it("shows Maximally unhinged cope label when dramatic mode is off", () => {
    useUnhingedStore.setState({ dramaticMode: false, copeIntensity: 90 })
    render(<UnhingedSection />)
    expect(screen.getByText(/90 · Maximally unhinged/)).toBeInTheDocument()
    expect(screen.queryByText(/BEYOND REASON/)).not.toBeInTheDocument()
  })
})