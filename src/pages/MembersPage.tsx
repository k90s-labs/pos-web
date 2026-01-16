// src/pages/MembersPage.tsx
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import {
  fetchMembers,
  createMember,
  addMemberPoints,
  generateMemberId,
} from "../apis/members";
import type { Member } from "../types/member";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  // 페이지네이션 상태
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  // 새 멤버 폼
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [prefix, setPrefix] = useState("MBR");
  const [generatedMemberId, setGeneratedMemberId] = useState("");

  // 포인트 입력값 (멤버별)
  const [pointsToAdd, setPointsToAdd] = useState<Record<number, number>>({});

  const loadMembers = async (params?: { search?: string; page?: number }) => {
    try {
      setLoading(true);
      setError(null);

      const searchValue = params?.search ?? search;
      const pageValue = params?.page ?? page;

      const data = await fetchMembers({
        search: searchValue || undefined,
        page: pageValue,
      });

      setMembers(data.results);
      setTotalCount(data.count);
      setHasNext(Boolean(data.next));
      setHasPrev(Boolean(data.previous));
      setPage(pageValue);
    } catch (err) {
      console.error(err);
      setError("멤버 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 최초 로딩
  useEffect(() => {
    void loadMembers({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loadMembers({ search, page: 1 });
  };

  const handleCreateMember = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!name || !phoneNumber) {
      setError("이름과 전화번호는 필수입니다.");
      return;
    }

    try {
      const payload = {
        name,
        phone_number: phoneNumber,
        // 미리 생성된 member_id가 있으면 그걸 사용, 없으면 prefix로 자동생성
        ...(generatedMemberId
          ? { member_id: generatedMemberId }
          : { prefix }),
      };

      const newMember = await createMember(payload);
      // 현재 페이지 맨 앞으로 삽입
      setMembers((prev) => [newMember, ...prev]);
      setTotalCount((prev) => prev + 1);

      // 폼 초기화
      setName("");
      setPhoneNumber("");
      setGeneratedMemberId("");
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.response?.data?.member_id) {
        const msg = Array.isArray(err.response.data.member_id)
          ? err.response.data.member_id.join(", ")
          : String(err.response.data.member_id);
        setError(msg);
      } else {
        setError("멤버 생성 중 오류가 발생했습니다.");
      }
    }
  };

  const handleGenerateMemberId = async () => {
    try {
      setError(null);
      const memberId = await generateMemberId(prefix);
      setGeneratedMemberId(memberId);
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("member_id 생성 중 오류가 발생했습니다.");
      }
    }
  };

  const handleChangePointsInput = (memberId: number, value: string) => {
    const num = Number(value);
    setPointsToAdd((prev) => ({
      ...prev,
      [memberId]: Number.isNaN(num) ? 0 : num,
    }));
  };

  const handleAddPoints = async (memberId: number) => {
    const points = pointsToAdd[memberId] ?? 0;
    if (points <= 0) {
      setError("포인트는 0보다 큰 숫자여야 합니다.");
      return;
    }

    try {
      setError(null);
      const updated = await addMemberPoints(memberId, points);
      setMembers((prev) =>
        prev.map((m) => (m.id === memberId ? updated : m)),
      );
      setPointsToAdd((prev) => ({ ...prev, [memberId]: 0 }));
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("포인트 추가 중 오류가 발생했습니다.");
      }
    }
  };

  const handleGoPrevPage = () => {
    if (!hasPrev || page <= 1 || loading) return;
    void loadMembers({ page: page - 1 });
  };

  const handleGoNextPage = () => {
    if (!hasNext || loading) return;
    void loadMembers({ page: page + 1 });
  };

  const handleReset = () => {
    setSearch("");
    setError(null);
    void loadMembers({ search: "", page: 1 });
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h1>Members</h1>

      {/* 에러 메시지 */}
      {error && (
        <div
          style={{
            backgroundColor: "#ffe5e5",
            padding: 8,
            marginBottom: 12,
            borderRadius: 4,
            color: "#b00020",
          }}
        >
          {error}
        </div>
      )}

      {/* 검색 */}
      <form
        onSubmit={handleSearchSubmit}
        style={{ display: "flex", gap: 8, marginBottom: 16 }}
      >
        <input
          type="text"
          placeholder="이름, 전화번호, member_id 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" disabled={loading}>
          검색
        </button>
        <button type="button" onClick={handleReset}>
          초기화
        </button>
      </form>

      {/* 페이징 정보 + 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          fontSize: 13,
          color: "#555",
        }}
      >
        <div>총 멤버 수: {totalCount.toLocaleString()}명</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            type="button"
            onClick={handleGoPrevPage}
            disabled={loading || !hasPrev || page <= 1}
          >
            이전
          </button>
          <span>페이지 {page}</span>
          <button
            type="button"
            onClick={handleGoNextPage}
            disabled={loading || !hasNext}
          >
            다음
          </button>
        </div>
      </div>

      {/* 멤버 생성 폼 */}
      <form
        onSubmit={handleCreateMember}
        style={{
          border: "1px solid #ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <h2>새 멤버 등록</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ flex: 1, padding: 8 }}
          />
          <input
            type="text"
            placeholder="전화번호 (숫자만)"
            value={phoneNumber}
            onChange={(e) => {
              const v = e.target.value;
              if (/^\d*$/.test(v)) {
                setPhoneNumber(v);
              }
            }}
            style={{ flex: 1, padding: 8 }}
          />
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input
            type="text"
            placeholder="멤버 prefix (예: MBR)"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            style={{ padding: 8 }}
          />
          <button type="button" onClick={handleGenerateMemberId}>
            member_id 미리 생성
          </button>
        </div>

        {generatedMemberId && (
          <div style={{ marginBottom: 8 }}>
            생성된 member_id: <strong>{generatedMemberId}</strong>
          </div>
        )}

        <button type="submit" disabled={loading}>
          멤버 등록
        </button>
      </form>

      {/* 멤버 목록 + 로딩 오버레이 */}
      <div
        style={{
          position: "relative",
          minHeight: 200,
        }}
      >
        {members.length === 0 ? (
          <div>등록된 멤버가 없습니다.</div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 14,
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    borderBottom: "1px solid #ccc",
                    textAlign: "left",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ccc",
                    textAlign: "left",
                  }}
                >
                  Member ID
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ccc",
                    textAlign: "left",
                  }}
                >
                  이름
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ccc",
                    textAlign: "left",
                  }}
                >
                  전화번호
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ccc",
                    textAlign: "right",
                  }}
                >
                  포인트
                </th>
                <th
                  style={{
                    borderBottom: "1px solid #ccc",
                    textAlign: "left",
                  }}
                >
                  마지막 방문
                </th>
                <th style={{ borderBottom: "1px solid #ccc" }}>포인트 추가</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <td style={{ padding: 6 }}>{m.id}</td>
                  <td style={{ padding: 6 }}>{m.member_id}</td>
                  <td style={{ padding: 6 }}>{m.name}</td>
                  <td style={{ padding: 6 }}>{m.phone_number}</td>
                  <td style={{ padding: 6, textAlign: "right" }}>
                    {m.points.toLocaleString()}
                  </td>
                  <td style={{ padding: 6 }}>
                    {m.last_visited_at
                      ? new Date(m.last_visited_at).toLocaleString()
                      : "-"}
                  </td>
                  <td style={{ padding: 6 }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <input
                        type="number"
                        value={pointsToAdd[m.id] ?? ""}
                        onChange={(e) =>
                          handleChangePointsInput(m.id, e.target.value)
                        }
                        style={{ width: 80, padding: 4 }}
                        placeholder="포인트"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddPoints(m.id)}
                        disabled={loading}
                      >
                        추가
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* 로딩 오버레이 */}
        {loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.7)",
              fontSize: 14,
            }}
          >
            로딩 중...
          </div>
        )}
      </div>
    </div>
  );
}
