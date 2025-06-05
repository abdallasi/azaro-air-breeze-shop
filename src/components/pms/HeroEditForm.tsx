
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroEditFormProps {
  hero?: HeroImage;
  onSave: (data: HeroImage) => void;
  onCancel: () => void;
}

const HeroEditForm = ({ hero, onSave, onCancel }: HeroEditFormProps) => {
  const [formData, setFormData] = useState({
    src: hero?.src || "",
    alt: hero?.alt || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, src: url });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="alt">Image Description</Label>
        <Input
          id="alt"
          value={formData.alt}
          onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
          placeholder="e.g., Azaro Air fabric in motion"
          required
        />
      </div>

      <div>
        <Label htmlFor="image">Hero Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {formData.src && (
          <img
            src={formData.src}
            alt="Preview"
            className="mt-2 w-32 h-24 object-cover rounded-lg"
          />
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="bg-black hover:bg-gray-800">
          Save
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default HeroEditForm;
